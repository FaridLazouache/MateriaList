import { db } from "./db";
import fs from "fs";
import path from "path";

/**
 * Initializes the database schema by executing the SQL statements
 */
export function initDb() {
  const schemaPath = path.resolve("src/database/init.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.exec(schema);

  console.info("✅ SQLite schema initialized");
}

/**
 * Seeds the database with test data by executing the SQL statements
 */
export function testDB() {
  const schemaPath = path.resolve("src/database/test.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.exec(schema);

  console.info("✅ Database test schema initialized");
}
