import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateSampleIndex } from '../src/prebuild.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function main() {
	const outputs = [path.join(__dirname, 'sample-index.json')];

	await generateSampleIndex({ outputs });
	console.log('[mcp] vercel build preparation finished');
}

main().catch((error) => {
	console.error('[mcp] vercel build failed', error);
	process.exitCode = 1;
});
