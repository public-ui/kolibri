#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themeExport = process.argv[2] || 'ECL_EC';
const themeModule = path.resolve(__dirname, 'dist');
const sampleReactPath = path.resolve(__dirname, '../../../node_modules/@public-ui/sample-react');

console.log('Starting development server...');
console.log(`THEME_MODULE=${themeModule}`);
console.log(`THEME_EXPORT=${themeExport}`);
console.log(`Working directory: ${sampleReactPath}`);

const env = {
	...process.env,
	THEME_MODULE: themeModule,
	THEME_EXPORT: themeExport,
};

const child = spawn('npm', ['start'], {
	cwd: sampleReactPath,
	env,
	stdio: 'inherit',
	shell: true,
});

child.on('error', (error) => {
	console.error(`Error starting server: ${error.message}`);
	process.exit(1);
});

child.on('exit', (code) => {
	process.exit(code || 0);
});
