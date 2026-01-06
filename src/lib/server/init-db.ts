import type Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const __dirname = process.cwd();

// dossier data/db à la racine du projet
const dataDir = path.resolve(__dirname, `src/conf/database`);
const initPath = path.join(dataDir, "init.sql");
const testPath = path.join(dataDir, "test.sql");

/**
 * Initializes the database schema by executing the SQL statements
 */
export function initDb(db: Database.Database) {
  if (!fs.existsSync(initPath)) {
    throw new Error(`Initialization SQL file not found at path: ${initPath}`);
  }
  const schema = fs.readFileSync(initPath, "utf-8");

  db.exec(schema);

  console.info("✅ SQLite schema initialized");
}

/**
 * Seeds the database with test data by executing the SQL statements
 */
export function testDB(db: Database.Database) {
  const schema = fs.readFileSync(testPath, "utf-8");

  db.exec(schema);

  console.info("✅ Database test schema initialized");
}
