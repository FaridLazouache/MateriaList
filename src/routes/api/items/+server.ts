import type { RequestHandler } from "./$types";
import { addItem, getItems } from "$lib/server/query";

export const GET: RequestHandler = async () => {
  const items = await getItems();
  return new Response(JSON.stringify(items), { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
  const { name, manufacturer_id, picture_id } = await request.json();
  const newItem = await addItem(name, manufacturer_id, picture_id);
  return new Response(JSON.stringify(newItem), { status: 201 });
};
