import { sql } from "./db";

/* ------------------------- ITEM ------------------------- */
export async function getItems() {
  return sql`SELECT * FROM item ORDER BY id`;
}

export async function getItem(id: number) {
  const [item] = await sql`SELECT * FROM item WHERE id = ${id}`;
  return item;
}

export async function addItem(
  name: string,
  manufacturer_id: number | null,
  picture_id: number | null
) {
  const [newItem] = await sql`
      INSERT INTO item (name, manufacturer_id, picture_id)
      VALUES (${name}, ${manufacturer_id}, ${picture_id})
      RETURNING *;
    `;
  return newItem;
}

export async function updateItem(
  id: number,
  data: {
    name?: string;
    manufacturer_id?: number;
    picture_id?: number;
  }
) {
  const [updated] = await sql`
    UPDATE item SET
      name = COALESCE(${data.name}, name),
      manufacturer_id = COALESCE(${data.manufacturer_id}, manufacturer_id),
      picture_id = COALESCE(${data.picture_id}, picture_id)
    WHERE id = ${id}
    RETURNING *;
  `;
  return updated;
}

export async function deleteItem(id: number) {
  await sql`DELETE FROM item WHERE id = ${id}`;
  return true;
}

/* ------------------------- UNIVERSE ------------------------- */

export async function getUniverses() {
  return sql`SELECT * FROM universe ORDER BY id`;
}

export async function getUniverse(id: number) {
  const [universe] = await sql`SELECT * FROM universe WHERE id = ${id}`;
  return universe;
}

export async function addUniverse(name: string, color: string) {
  const [newUniverse] = await sql`
      INSERT INTO universe (name, color)
      VALUES (${name}, ${color})
      RETURNING *;
    `;
  return newUniverse;
}

export async function updateUniverse(
  id: number,
  data: { name?: string; color?: string }
) {
  const [updated] = await sql`
    UPDATE universe SET
      name = COALESCE(${data.name}, name),
      color = COALESCE(${data.color}, color)
    WHERE id = ${id}
    RETURNING *;
  `;
  return updated;
}

export async function deleteUniverse(id: number) {
  await sql`DELETE FROM universe WHERE id = ${id}`;
  return true;
}

/* ------------------------- MANUFACTURER ------------------------- */

export async function getManufacturers() {
  return sql`SELECT * FROM manufacturer ORDER BY id`;
}

export async function getManufacturer(id: number) {
  const [man] = await sql`SELECT * FROM manufacturer WHERE id = ${id}`;
  return man;
}

export async function addManufacturer(name: string) {
  const [newMan] = await sql`
      INSERT INTO manufacturer (name)
      VALUES (${name})
      RETURNING *;
    `;
  return newMan;
}

export async function updateManufacturer(id: number, data: { name?: string }) {
  const [updated] = await sql`
    UPDATE manufacturer SET
      name = COALESCE(${data.name}, name)
    WHERE id = ${id}
    RETURNING *;
  `;
  return updated;
}

export async function deleteManufacturer(id: number) {
  await sql`DELETE FROM manufacturer WHERE id = ${id}`;
  return true;
}

/* ------------------------- PICTURE ------------------------- */

export async function getPictures() {
  return sql`SELECT * FROM picture ORDER BY id`;
}

export async function getPicture(id: number) {
  const [pic] = await sql`SELECT * FROM picture WHERE id = ${id}`;
  return pic;
}

export async function addPicture(
  title: string,
  path: string,
  main: boolean | null
) {
  const [newPic] = await sql`
      INSERT INTO picture (title, path, main)
      VALUES (${title}, ${path}, ${main})
      RETURNING *;
    `;
  return newPic;
}

export async function updatePicture(
  id: number,
  data: { title?: string; path?: string; main?: boolean }
) {
  const [updated] = await sql`
    UPDATE picture SET
      title = COALESCE(${data.title}, title),
      path = COALESCE(${data.path}, path),
      main = COALESCE(${data.main}, main)
    WHERE id = ${id}
    RETURNING *;
  `;
  return updated;
}

export async function deletePicture(id: number) {
  await sql`DELETE FROM picture WHERE id = ${id}`;
  return true;
}

/* ------------------------- UNIVERSE_ITEM (pivot) ------------------------- */

export async function getUniverseItems() {
  return sql`SELECT * FROM universe_item ORDER BY id`;
}

export async function getUniverseItem(id: number) {
  const [row] = await sql`SELECT * FROM universe_item WHERE id = ${id}`;
  return row;
}

export async function addUniverseItem(item_id: number, universe_id: number) {
  const [newRow] = await sql`
      INSERT INTO universe_item (item_id, universe_id)
      VALUES (${item_id}, ${universe_id})
      RETURNING *;
    `;
  return newRow;
}

export async function deleteUniverseItem(id: number) {
  await sql`DELETE FROM universe_item WHERE id = ${id}`;
  return true;
}

/* ------------------------- CONNECTION TEST ------------------------- */

export async function connectionTest() {
  const res = await sql`SELECT current_database() AS db_name;`;
  return res[0].db_name === process.env.POSTGRES_DATABASE;
}
