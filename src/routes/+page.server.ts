import { connect } from 'http2';
import type { PageServerLoad } from './$types';
import { connectionTest } from '$lib/server/query';


export const load: PageServerLoad = async () => {
    console.info("Fetching materials from database...");
  const connection = await connectionTest();
  console.info(`Database connection test result: ${connection}`);
  return { connection };
};

