import {
  POSTGRES_URL,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} from "$env/static/private";
import postgres from "postgres";

const encodedPassword = encodeURIComponent(POSTGRES_PASSWORD).toString();

export const url = `postgresql://${POSTGRES_USER}:${encodedPassword}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`;

console.debug(`Postgres connection URL: ${url}`);

export const sql = postgres(url, { ssl: false });
