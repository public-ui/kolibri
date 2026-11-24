#!/usr/bin/env node
// Makes the Stencil type emit (dist/types/**/*.d.ts) self-contained regarding the internals and
// functional-components packages, so the published type graph works without them being resolvable
// at the consumer:
//
// 1. The internals `tsc` emit (internals/dist/**/*.d.ts) is copied into dist/types/internals.
// 2. The functional-components emit (fc/dist/fc/src/**/*.d.ts) is copied into
//    dist/types/functional-components; its relative `internals/src` references resolve inside the
//    copy to the internals inlining of step 1, since both copies keep their layout.
// 3. Every reference in the emit — relative `internals/src` and `fc/src` paths and
//    `@public-ui/internals` package specifiers, in `from` statements as well as inline
//    `import(...)` types — is rewritten to a relative import into those copies.
//
// Requires the `tsc` emits of both packages to have run first (the prebuild of this package chains
// them via the workspace dependency graph). Runtime imports remain untouched — only the type emit
// is rewritten.
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const packageDir = process.cwd();
const typesDir = path.resolve(packageDir, 'dist/types');
const sources = [
	{ dist: path.resolve(packageDir, 'internals/dist'), inlined: path.join(typesDir, 'internals'), label: 'internals' },
	{ dist: path.resolve(packageDir, 'fc/dist/fc/src'), inlined: path.join(typesDir, 'functional-components'), label: 'functional-components' },
];

for (const source of sources) {
	if (!existsSync(source.dist)) {
		console.error(`rewrite-emit-internals-paths: ${source.label} emit not found at ${source.dist} — run the package build first.`);
		process.exit(1);
	}
}

// 1+2. Inline the type emits (declaration files only; the runtime copies stay out of the type tree).
for (const source of sources) {
	cpSync(source.dist, source.inlined, {
		recursive: true,
		filter: (sourcePath) => {
			if (statSync(sourcePath).isDirectory()) return true;
			return sourcePath.endsWith('.d.ts');
		},
	});
}

const walk = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return walk(full);
		return entry.name.endsWith('.d.ts') ? [full] : [];
	});

// 3. Rewrite internals and functional-components references — relative source paths as well as
//    package specifiers — onto the inlined copies, as a relative import from each referencing file.
const SPECIFIER_RE = /((?:from\s*|import\s*\()(['"]))(@public-ui\/internals\/|(?:\.\.\/)+internals\/src\/|(?:\.\.\/)+fc\/src\/)([^'"]+)(['"])/g;

let rewritten = 0;
let files = 0;
for (const file of walk(typesDir)) {
	const source = readFileSync(file, 'utf8');
	let next = source;
	for (const match of source.matchAll(SPECIFIER_RE)) {
		const [full, prefix, quote, marker, rel] = match;
		const inlinedDir = marker.includes('fc/src') ? sources[1].inlined : sources[0].inlined;
		const target = path.join(inlinedDir, rel);
		const relative = path
			.relative(path.dirname(file), target)
			.replace(/\.d\.ts$/, '')
			.replace(/\\/g, '/');
		next = next.replace(full, `${prefix}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`);
		rewritten += 1;
	}
	if (next !== source) {
		writeFileSync(file, next);
		files += 1;
	}
}
console.log(`rewrite-emit-internals-paths: internals + functional-components emits inlined to dist/types, ${rewritten} imports rewritten in ${files} files`);
