#!/usr/bin/env node
// Copies asset folders from KoliBri dependency packages into a destination directory.
//
// Usage: kolibri-copy-assets --dest <destDir> <pkg>[:<subdir>] [<pkg>[:<subdir>] ...]
//   <subdir> defaults to "assets".
//
// Packages are resolved relative to the CURRENT WORKING DIRECTORY (the package
// whose script invoked this bin) via require.resolve.paths(), by probing for
// <root>/<pkg>/package.json. This works across pnpm workspace, pnpm isolated
// (published/consumer) and npm/yarn hoisted layouts, and bypasses the package
// "exports" gate (e.g. @public-ui/themes does not expose "./package.json").
// Missing packages or asset folders are skipped with a warning instead of failing.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

// Resolve dependencies from the caller's working directory, not this file's location.
const require = createRequire(path.join(process.cwd(), 'package.json'));

const args = process.argv.slice(2);
let dest = null;
const sources = [];
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--dest') {
		dest = args[++i];
	} else {
		sources.push(args[i]);
	}
}

if (!dest || sources.length === 0) {
	console.error('Usage: kolibri-copy-assets --dest <destDir> <pkg>[:<subdir>] ...');
	process.exit(2);
}

const destDir = path.resolve(dest);
mkdirSync(destDir, { recursive: true });

function findPackageDir(name) {
	for (const root of require.resolve.paths(name) ?? []) {
		const candidate = path.join(root, ...name.split('/'));
		if (existsSync(path.join(candidate, 'package.json'))) {
			return candidate;
		}
	}
	return null;
}

let copied = 0;
for (const source of sources) {
	const separator = source.lastIndexOf(':');
	const name = separator > 0 ? source.slice(0, separator) : source;
	const subdir = separator > 0 ? source.slice(separator + 1) : 'assets';
	const packageDir = findPackageDir(name);
	if (!packageDir) {
		console.warn(`[copy-assets] Skip ${name}: package not resolvable.`);
		continue;
	}
	const srcDir = path.join(packageDir, subdir);
	if (!path.resolve(srcDir).startsWith(path.resolve(packageDir) + path.sep)) {
		console.warn(`[copy-assets] Skip ${name}/${subdir}: subdir escapes the package directory.`);
		continue;
	}
	if (!existsSync(srcDir)) {
		console.warn(`[copy-assets] Skip ${name}/${subdir}: directory not found.`);
		continue;
	}
	cpSync(srcDir, destDir, { recursive: true });
	console.log(`[copy-assets] ${name}/${subdir} -> ${path.relative(process.cwd(), destDir)}`);
	copied++;
}

if (copied === 0) {
	console.warn(`[copy-assets] Nothing copied into ${dest}.`);
}
