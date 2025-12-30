// src/lib/server/init-db.ts
import { db } from "./db";
import fs from "fs";
import path from "path";

export function initDb() {
  const schemaPath = path.resolve("src/database/init.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.exec(schema);

  console.info("✅ SQLite schema initialized");
}

export function testDB() {
  const schemaPath = path.resolve("src/database/test.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.exec(schema);

  console.info("✅ Database test schema initialized");
}
