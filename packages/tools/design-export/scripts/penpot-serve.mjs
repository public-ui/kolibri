import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';

/**
 * Serves an export directory for the Penpot plugin: the plugin loads its
 * manifest from this server, and the plugin UI fetches penpot-import.json.
 * Plain Node built-ins, no dependencies.
 */
const root = resolve(process.argv[2] ?? 'dist-export');
const port = Number(process.argv[3] ?? 8818);

const MIME_TYPES = {
	'.json': 'application/json',
	'.js': 'text/javascript',
	'.html': 'text/html; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.css': 'text/css',
};

const server = createServer(async (request, response) => {
	try {
		const url = new URL(request.url ?? '/', 'http://localhost');
		const filePath = join(root, url.pathname);
		const info = await stat(filePath);
		if (!info.isFile()) {
			throw new Error('not a file');
		}
		const body = await readFile(filePath);
		// Penpot fetches manifest and code from its own origin, the plugin iframe may run with an opaque origin.
		response.writeHead(200, { 'access-control-allow-origin': '*', 'content-type': MIME_TYPES[extname(filePath)] ?? 'application/octet-stream' });
		response.end(body);
	} catch {
		response.writeHead(404, { 'access-control-allow-origin': '*' }).end('not found');
	}
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Design-Export-Server: http://127.0.0.1:${port}`);
	console.log(`Plugin-Manifest:      http://127.0.0.1:${port}/penpot-plugin/manifest.json`);
	console.log(`Import-Daten:         http://127.0.0.1:${port}/penpot/penpot-import.json`);
});
