// src/lib/server/db.ts
import Database from "better-sqlite3";
import type BetterSQLite3 from "better-sqlite3";
import path from "path";
import { existsSync, statSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { initDb, testDB } from "./init-db";

let isNew: boolean = false;

export function getDatabase(): {
  db: BetterSQLite3.Database;
  dbPath: string;
} {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dataDir = path.resolve(
    __dirname,
    `../../../src/${process.env.DATABASE_FOLDER}`
  );
  const dbPath = path.join(dataDir, process.env.DATABASE_FILE || "undefined");
  console.debug("Database path:", dbPath);
  if (dbPath.includes("undefined")) {
    throw new Error("DATABASE_FILE environment variable is not set");
  }

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  if (!existsSync(dbPath) || statSync(dbPath).size === 0) {
    isNew = true;
  }
  return {
    db: new Database(dbPath, {
      verbose: process.env.NODE_ENV !== "test" ? console.debug : undefined,
    }),
    dbPath,
  };
}

export function startDatabase(db: BetterSQLite3.Database, dbPath: string) {
  db.pragma("foreign_keys = ON");

  if (isNew) {
    console.info("Initializing new database...");
    initDb(db);
  }

  if (
    (process.env.NODE_ENV == "test" && isNew) ||
    (process.env.NODE_ENV == "development" && isNew)
  ) {
    console.info("Seeding database with test data...");
    testDB(db);
    isNew = false;
  }

  console.info("SQLite database connected at", dbPath);
}
