#!/usr/bin/env node
/**
 * Generates the static template index at build time.
 * Clones/updates the configured template repositories and builds a search index.
 *
 * Usage: pnpm generate-templates-index
 */

import { updateTemplateIndex } from '../src/templates/indexer/fetcher.ts';

async function main() {
	console.log('📚 Updating template index...');

	try {
		await updateTemplateIndex();
		console.log('✅ Template index updated successfully');
		process.exit(0);
	} catch (error) {
		console.error('❌ Failed to update template index:', error);
		process.exit(1);
	}
}

main();
