import { handler as prebuiltHandler } from '../../src/netlify/handler-prebuilt.js';

export const handler = async (event, context) => prebuiltHandler(event, context);
export default handler;
