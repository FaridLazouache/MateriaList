import type { RequestHandler } from './$types';
import { addItem, getItems } from '$lib/server/crud';

export const GET: RequestHandler = async () => {
  const items = await getItems();
  return new Response(JSON.stringify(items), { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
  const { name } = await request.json();
  const newItem = await addItem(name);
  return new Response(JSON.stringify(newItem), { status: 201 });
};