import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderDocument } from './ssr.mjs';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const outFile = join(outDir, 'index.html');

/**
 * Logs any error/warning diagnostics returned by the hydrate renderer.
 *
 * @param {unknown[]} diagnostics
 */
function reportDiagnostics(diagnostics) {
	const relevant = diagnostics.filter((entry) => entry && (entry.level === 'error' || entry.level === 'warn'));
	for (const entry of relevant) {
		console.warn(`  [${entry.level}] ${entry.messageText ?? entry.message ?? JSON.stringify(entry)}`);
	}
}

try {
	const { html, diagnostics } = await renderDocument();
	await mkdir(outDir, { recursive: true });
	await writeFile(outFile, html, 'utf8');
	console.log(`✓ Pre-rendered the KoliBri SSR demo → ${outFile}`);
	reportDiagnostics(diagnostics);
} catch (error) {
	// Missing hydrate bundle is an expected state before the components build
	// has run. Do not fail the (recursive) build for it — just inform the user.
	if (error?.code === 'HYDRATE_NOT_BUILT') {
		console.warn(`… skipping SSR pre-render: ${error.message}`);
		process.exit(0);
	}
	throw error;
}
