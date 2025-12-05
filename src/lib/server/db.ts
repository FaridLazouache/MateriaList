import {
  POSTGRES_URL,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} from "$env/static/private";
import postgres from "postgres";


let url: URL = new URL("postgresql://user:password@localhost:5432/database");

  url = new URL(
    `postgresql://${POSTGRES_USER}:${encodeURIComponent(POSTGRES_PASSWORD)}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`);

export const sql = postgres(url.toString(), { ssl: false});


