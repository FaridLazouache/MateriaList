import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs, { rmSync } from "fs";
import { env } from "$env/dynamic/private";

vi.mock("$env/dynamic/private", () => ({
  env: {
    DATABASE_FOLDER: "test-data",
    DATABASE_FILE: "test.db",
    NODE_ENV: "test",
  },
}));
import { getDatabase, startDatabase } from "../db";

describe("Database", () => {
  beforeEach(() => {
    //* Restore environment variables for testing */
    env.DATABASE_FOLDER = "database_test";
    env.DATABASE_FILE = "materialist_test.sqlite";
    env.NODE_ENV = "test";
  });
  afterEach(async () => {
    console.log("Cleaning up test database...");
    console.log(`Removing src/${env.DATABASE_FOLDER}...`);
    rmSync(`src/${env.DATABASE_FOLDER}`, {
      recursive: true,
      force: true,
    });
  });

  it("should open the SQLite database", () => {
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    expect(db.open).toBe(true);
  });

  it("should execute a simple query", () => {
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const row: any = db.prepare("SELECT 1 as ok").get();
    expect(row.ok).toBe(1);
  });

  it("should throw error if DATABASE_FILE is not set", () => {
    env.DATABASE_FILE = "";
    expect(() => getDatabase()).toThrow(
      "DATABASE_FILE environment variable is not set"
    );
  });

  it("should not seed database if not in test or development mode", () => {
    env.NODE_ENV = "production";
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const row: any = db.prepare(`SELECT * FROM item ORDER BY id`).all()[0];
    expect(row).toBeUndefined();
  });

  it("should seed database in development mode", () => {
    env.NODE_ENV = "development";
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const row: any = db.prepare(`SELECT * FROM item ORDER BY id`).all()[0];
    expect(row).toBeDefined();
  });

  it("should seed database in test mode", () => {
    env.NODE_ENV = "test";
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const row: any = db.prepare(`SELECT * FROM item ORDER BY id`).all()[0];
    expect(row).toBeDefined();
  });

  it("should not seed existing database", () => {
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const row1: any = db.prepare(`SELECT * FROM item ORDER BY id`).all()[0];
    expect(row1).toBeDefined();

    // Restart database
    const { db: db2, dbPath: dbPath2 } = getDatabase();
    startDatabase(db2, dbPath2);
    const row2: any = db2.prepare(`SELECT * FROM item ORDER BY id`).all()[0];
    expect(row2).toBeDefined();
  });

  it("should enable foreign key constraints", () => {
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    const pragma: any = db.prepare("PRAGMA foreign_keys").get();
    expect(pragma.foreign_keys).toBe(1);
  });

  it("should create database directory if it does not exist", () => {
    env.DATABASE_FOLDER = "non_existent_directory/database_test";
    expect(fs.existsSync(`src/${env.DATABASE_FOLDER}`)).toBe(false);
    const { db, dbPath } = getDatabase();
    startDatabase(db, dbPath);
    expect(db.open).toBe(true);
    expect(dbPath).toContain("non_existent_directory/database_test");
    expect(fs.existsSync(`src/${env.DATABASE_FOLDER}`)).toBe(true);
  });

  it("should throw error if init.sql file is missing", () => {
    const { db, dbPath } = getDatabase();
    // Temporarily rename init.sql to simulate missing file
    const initSqlPath = `src/conf/database/init.sql`;
    const tempPath = `src/conf/database/init_temp.sql`;
    fs.renameSync(initSqlPath, tempPath);

    expect(() => startDatabase(db, dbPath)).toThrow(
      `Initialization SQL file not found at path:`
    );

    // Restore init.sql file
    fs.renameSync(tempPath, initSqlPath);
  });
});
