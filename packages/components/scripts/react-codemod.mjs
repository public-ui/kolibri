/*
 * The official React output target generates proxies that call `createComponent` at module scope,
 * which would resolve the tag name against an unregistered transformer and define the custom
 * elements eagerly. This script rewrites the generated proxies to the deferred wrapper from the
 * adapter's kolibri-src layer, which resolves the tag and defines the element on the first render.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));

const proxies = ['../../adapters/react/src/components.ts', '../../adapters/react-v19/src/components.ts'];

for (const file of proxies.map((proxy) => join(scriptDir, proxy))) {
	const source = readFileSync(file, 'utf8');
	const rewritten = source.replace(
		"import { createComponent } from '@stencil/react-output-target/runtime';",
		"import { createComponent } from '../kolibri-src/create-component';",
	);
	if (rewritten === source) {
		throw new Error(`react-codemod: no createComponent import found in ${file}`);
	}
	writeFileSync(file, rewritten);
	console.log(`react-codemod: deferred proxy creation in ${file}`);
}
