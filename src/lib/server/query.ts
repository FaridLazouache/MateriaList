import { sql, url } from './db';

export async function getItems() {
  return sql`SELECT id, name FROM item ORDER BY id`;
}
export async function addItem(name: string) {
  const [newItem] = await sql`INSERT INTO item (name) VALUES (${name}) RETURNING id, name`;
  return newItem;
}

export async function connectionTest() {
    console.debug(`Testing connection to database at URL: ${url.toString()}`);
  const connection = await sql`SELECT current_database() AS db_name;`;
  console.debug(`Connection test result: ${JSON.stringify(connection)}`);
    return (connection[0].db_name === process.env.POSTGRES_DATABASE);
}