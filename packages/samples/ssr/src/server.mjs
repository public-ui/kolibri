import { createServer } from 'node:http';
import { renderDocument } from './ssr.mjs';

const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 8080);

const server = createServer((req, res) => {
	if (req.method !== 'GET') {
		res.writeHead(405, { allow: 'GET', 'content-type': 'text/plain; charset=utf-8' });
		res.end('Method Not Allowed');
		return;
	}

	if (req.url === '/health') {
		res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
		res.end('ok');
		return;
	}

	renderDocument()
		.then(({ html }) => {
			res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
			res.end(html);
		})
		.catch((error) => {
			console.error(error);
			res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
			res.end(`Server-side rendering failed: ${error.message}`);
		});
});

server.listen(port, host, () => {
	console.log(`KoliBri SSR demo running at http://${host}:${port}`);
	console.log('Every request is rendered on the server with @public-ui/hydrate.');
});
