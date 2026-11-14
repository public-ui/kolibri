#!/usr/bin/env node
// Makes the Stencil type emit (dist/types/**/*.d.ts) self-contained regarding the internals
// package, so the published type graph works without internals being resolvable at the
// consumer:
//
// 1. The internals `tsc` emit (../internals/dist/**/*.d.ts) is copied into dist/types/internals.
// 2. Every internals reference in the emit — relative `internals/src` paths and
//    `@public-ui/internals` package specifiers, in `from` statements as well as inline
//    `import(...)` types — is rewritten to a relative import into that copy.
//
// Requires `pnpm --filter @public-ui/internals build` to have run first (the prebuild of this
// package chains it). Runtime imports of the internals package specifier remain untouched —
// only the type emit is rewritten.
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const packageDir = process.cwd();
const typesDir = path.resolve(packageDir, 'dist/types');
const internalsDist = path.resolve(packageDir, 'internals/dist');
const inlinedDir = path.join(typesDir, 'internals');

if (!existsSync(internalsDist)) {
	console.error('rewrite-emit-internals-paths: internals/dist not found — run `pnpm --filter @public-ui/internals build` first.');
	process.exit(1);
}

// 1. Inline the internals type emit (declaration files only; the runtime copies stay out of the
//    type tree).
cpSync(internalsDist, inlinedDir, {
	recursive: true,
	filter: (source) => {
		if (statSync(source).isDirectory()) return true;
		return source.endsWith('.d.ts');
	},
});

const walk = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return walk(full);
		return entry.name.endsWith('.d.ts') ? [full] : [];
	});

// 2. Rewrite internals references — relative source paths as well as package specifiers — onto
//    the inlined copy, as a relative import from each referencing file.
const SPECIFIER_RE = /((?:from\s*|import\s*\()(['"]))(@public-ui\/internals\/|(?:\.\.\/)+internals\/src\/)([^'"]+)(['"])/g;

let rewritten = 0;
let files = 0;
for (const file of walk(typesDir)) {
	const source = readFileSync(file, 'utf8');
	let next = source;
	for (const match of source.matchAll(SPECIFIER_RE)) {
		const [full, prefix, quote, , rel] = match;
		const target = path.join(inlinedDir, rel);
		const relative = path.relative(path.dirname(file), target).replace(/\.d\.ts$/, '').replace(/\\/g, '/');
		next = next.replace(full, `${prefix}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`);
		rewritten += 1;
	}
	if (next !== source) {
		writeFileSync(file, next);
		files += 1;
	}
}
console.log(`rewrite-emit-internals-paths: internals emit inlined to dist/types/internals, ${rewritten} imports rewritten in ${files} files`);
