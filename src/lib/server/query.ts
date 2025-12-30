import { db } from "./db";

/* ========================= ITEM ========================= */

export function getItems() {
  return db.prepare(`SELECT * FROM item ORDER BY id`).all();
}

export function getItem(id: number) {
  return db.prepare(`SELECT * FROM item WHERE id = ?`).get(id);
}

export function addItem(
  name: string,
  manufacturer_id: number | null,
  picture_id: number | null
) {
  const res = db
    .prepare(
      `
    INSERT INTO item (name, manufacturer_id, picture_id)
    VALUES (?, ?, ?)
  `
    )
    .run(name, manufacturer_id, picture_id);

  return getItem(Number(res.lastInsertRowid));
}

export function updateItem(
  id: number,
  data: { name?: string; manufacturer_id?: number; picture_id?: number }
) {
  db.prepare(
    `
    UPDATE item SET
      name = COALESCE(?, name),
      manufacturer_id = COALESCE(?, manufacturer_id),
      picture_id = COALESCE(?, picture_id)
    WHERE id = ?
  `
  ).run(data.name, data.manufacturer_id, data.picture_id, id);

  return getItem(id);
}

export function deleteItem(id: number) {
  db.prepare(`DELETE FROM item WHERE id = ?`).run(id);
  return true;
}

/* ========================= UNIVERSE ========================= */

export function getUniverses() {
  return db.prepare(`SELECT * FROM universe ORDER BY id`).all();
}

export function getUniverse(id: number) {
  return db.prepare(`SELECT * FROM universe WHERE id = ?`).get(id);
}

export function addUniverse(name: string, color: string) {
  const res = db
    .prepare(
      `
    INSERT INTO universe (name, color)
    VALUES (?, ?)
  `
    )
    .run(name, color);

  return getUniverse(Number(res.lastInsertRowid));
}

export function updateUniverse(
  id: number,
  data: { name?: string; color?: string }
) {
  db.prepare(
    `
    UPDATE universe SET
      name = COALESCE(?, name),
      color = COALESCE(?, color)
    WHERE id = ?
  `
  ).run(data.name, data.color, id);

  return getUniverse(id);
}

export function deleteUniverse(id: number) {
  db.prepare(`DELETE FROM universe WHERE id = ?`).run(id);
  return true;
}

/* ========================= MANUFACTURER ========================= */

export function getManufacturers() {
  return db.prepare(`SELECT * FROM manufacturer ORDER BY id`).all();
}

export function getManufacturer(id: number) {
  return db.prepare(`SELECT * FROM manufacturer WHERE id = ?`).get(id);
}

export function addManufacturer(name: string) {
  const res = db
    .prepare(
      `
    INSERT INTO manufacturer (name)
    VALUES (?)
  `
    )
    .run(name);

  return getManufacturer(Number(res.lastInsertRowid));
}

export function updateManufacturer(id: number, data: { name?: string }) {
  db.prepare(
    `
    UPDATE manufacturer SET
      name = COALESCE(?, name)
    WHERE id = ?
  `
  ).run(data.name, id);

  return getManufacturer(id);
}

export function deleteManufacturer(id: number) {
  db.prepare(`DELETE FROM manufacturer WHERE id = ?`).run(id);
  return true;
}

/* ========================= PICTURES ========================= */

export function getPictures() {
  return db.prepare(`SELECT * FROM pictures ORDER BY id`).all();
}

export function getPicture(id: number) {
  return db.prepare(`SELECT * FROM pictures WHERE id = ?`).get(id);
}

export function addPicture(title: string, path: string, main: boolean | null) {
  const res = db
    .prepare(
      `
    INSERT INTO pictures (title, path, main)
    VALUES (?, ?, ?)
  `
    )
    .run(title, path, main ? 1 : 0);

  return getPicture(Number(res.lastInsertRowid));
}

export function updatePicture(
  id: number,
  data: { title?: string; path?: string; main?: boolean }
) {
  db.prepare(
    `
    UPDATE pictures SET
      title = COALESCE(?, title),
      path = COALESCE(?, path),
      main = COALESCE(?, main)
    WHERE id = ?
  `
  ).run(data.title, data.path, data.main ? 1 : null, id);

  return getPicture(id);
}

export function deletePicture(id: number) {
  db.prepare(`DELETE FROM pictures WHERE id = ?`).run(id);
  return true;
}

/* ========================= UNIVERSE_ITEM ========================= */

export function getUniverseItems() {
  return db.prepare(`SELECT * FROM universe_item ORDER BY id`).all();
}

export function addUniverseItem(item_id: number, universe_id: number) {
  const res = db
    .prepare(
      `
    INSERT INTO universe_item (item_id, universe_id)
    VALUES (?, ?)
  `
    )
    .run(item_id, universe_id);

  return db
    .prepare(`SELECT * FROM universe_item WHERE id = ?`)
    .get(Number(res.lastInsertRowid));
}

export function deleteUniverseItem(id: number) {
  db.prepare(`DELETE FROM universe_item WHERE id = ?`).run(id);
  return true;
}

/* ========================= CONNECTION TEST ========================= */

export function connectionTest() {
  const res = db.prepare(`SELECT 1 AS ok`).get();
  return res.ok === 1;
}
