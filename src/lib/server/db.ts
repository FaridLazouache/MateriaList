import Database from "better-sqlite3";
import path from "path";
import { initDb, testDB } from "./init-db";
import { existsSync, statSync } from "fs";

// path to the SQLite database file
const dbPath = path.resolve("src/database/db.sqlite");

export const db = new Database(dbPath, {
  verbose: console.debug,
});

db.pragma("foreign_keys = ON");

// Initialize database schema and seed it with test data (delete in production) if the database file is empty
if (existsSync(dbPath) && statSync(dbPath).size === 0) {
  console.debug("Database file is empty, initializing schema...");
  initDb();
  testDB();
}

console.info("SQLite database connected at", dbPath);
