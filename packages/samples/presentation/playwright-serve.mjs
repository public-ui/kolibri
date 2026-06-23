#!/usr/bin/env node

import { spawn } from 'child_process';
import http from 'http';

const PORT = parseInt(process.env.KOLIBRI_VISUAL_TEST_PORT || '9191', 10);
const MAX_WAIT = 120;

console.log(`[Playwright Server] PORT=${PORT}`);
console.log(`[Playwright Server] Starting Vite server on port ${PORT}...`);

const server = spawn('npm', ['run', 'serve'], {
	shell: true,
	stdio: 'inherit',
});

let startTime = Date.now();

console.log(`[Playwright Server] Waiting for server to be ready...`);

const checkServer = () => {
	const elapsed = Math.floor((Date.now() - startTime) / 1000);

	if (elapsed > MAX_WAIT) {
		console.log(`[Playwright Server] ✗ Server startup timeout after ${MAX_WAIT}s`);
		server.kill();
		process.exit(1);
	}

	const req = http.get(`http://localhost:${PORT}/`, (res) => {
		if (res.statusCode === 200) {
			console.log(`[Playwright Server] ✓ Server is ready on http://localhost:${PORT}/ (${elapsed}s)`);
			// Keep the process running
			return;
		}
		console.log(`[Playwright Server] Waiting... (${elapsed}s, HTTP: ${res.statusCode})`);
		setTimeout(checkServer, 1000);
	});

	req.on('error', () => {
		console.log(`[Playwright Server] Waiting... (${elapsed}s, HTTP: connection refused)`);
		setTimeout(checkServer, 1000);
	});

	req.end();
};

setTimeout(checkServer, 500);

server.on('exit', (code) => {
	process.exit(code);
});

process.on('SIGTERM', () => {
	server.kill();
});

process.on('SIGINT', () => {
	server.kill();
});
