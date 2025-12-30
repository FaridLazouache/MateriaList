import Database from "better-sqlite3";
import path from "path";
import { initDb, testDB } from "./init-db";

// chemin vers la DB
const dbPath = path.resolve("src/database/db.sqlite");

// connexion SYNC (normal avec SQLite)
export const db = new Database(dbPath, {
  verbose: console.log, // enlève si trop bruyant
});

db.pragma("foreign_keys = ON");

// Init automatique
initDb();
testDB();

console.info("SQLite database connected at", dbPath);
