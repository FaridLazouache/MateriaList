PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS universe (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  color TEXT
);

CREATE TABLE IF NOT EXISTS manufacturer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS pictures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  path TEXT NOT NULL,
  main INTEGER DEFAULT 0 CHECK (main IN (0,1))
);

CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  manufacturer_id INTEGER,
  picture_id INTEGER,
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturer(id),
  FOREIGN KEY (picture_id) REFERENCES pictures(id)
);

CREATE TABLE IF NOT EXISTS universe_item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL,
  universe_id INTEGER NOT NULL,
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (universe_id) REFERENCES universe(id),
  UNIQUE (item_id, universe_id)
);
