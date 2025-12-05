import { sql } from './db';

export async function getItems() {
  return sql`SELECT id, name FROM item ORDER BY id`;
}

export async function connectionTest() {
  const connection = await sql`SELECT current_database() AS db_name, NOW() AS current_time;`;
    return (connection[0].db_name === process.env.POSTGRES_DATABASE);
}