#!/usr/bin/env node
/**
 * Skript zum manuellen Aktualisieren des Template-Index.
 * Klont/aktualisiert die konfigurierten Template-Repos und baut einen Suchindex.
 *
 * Usage: pnpm update-templates
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
