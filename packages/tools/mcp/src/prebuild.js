import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { buildSampleIndex } from './sample-index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_OUTPUTS = [path.join(__dirname, '../netlify/functions/sample-index.json')];

function serializeIndex(index) {
	return {
		entries: index.entries.map((entry) => ({
			id: entry.id,
			group: entry.group,
			name: entry.name,
			path: entry.path,
			code: entry.code,
		})),
		generatedAt: index.generatedAt.toISOString(),
	};
}

function normalizeOutputs(outputs = []) {
	const normalized = outputs.map((output) => path.resolve(output));
	return Array.from(new Set(normalized));
}

export async function generateSampleIndex({ outputs = DEFAULT_OUTPUTS, silent = false } = {}) {
	const resolvedOutputs = normalizeOutputs(outputs);
	if (resolvedOutputs.length === 0) {
		throw new Error('No output paths provided for sample index prebuild.');
	}

	if (!silent) {
		const targets = resolvedOutputs.map((output) => path.relative(process.cwd(), output));
		console.log(`[mcp] building sample index for ${targets.length} target(s)...`);
		for (const target of targets) {
			console.log(` - ${target}`);
		}
	}

	const index = await buildSampleIndex();
	const serialized = serializeIndex(index);

	for (const outputPath of resolvedOutputs) {
		mkdirSync(path.dirname(outputPath), { recursive: true });
		writeFileSync(outputPath, JSON.stringify(serialized));
		if (!silent) {
			console.log(`[mcp] sample index written to ${outputPath}`);
		}
	}

	if (!silent) {
		console.log(`[mcp] total entries: ${serialized.entries.length}`);
	}

	return serialized;
}

function parseOutputsFromArgs(args) {
	const outputs = [];
	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index];
		if (argument === '--help' || argument === '-h') {
			printUsage();
			return null;
		}

		if (argument === '--output' || argument === '-o') {
			const next = args[index + 1];
			if (!next) {
				throw new Error('Missing value for --output option.');
			}
			outputs.push(next);
			index += 1;
			continue;
		}

		if (argument.startsWith('--output=')) {
			outputs.push(argument.slice('--output='.length));
			continue;
		}
	}

	return outputs.length > 0 ? outputs : undefined;
}

function printUsage() {
	console.log('Usage: node src/prebuild.js [--output <file>]');
	console.log('');
	console.log('Options:');
	console.log('  --output, -o   Path to write the generated sample index to.');
	console.log('                 You can provide the flag multiple times.');
	console.log('                 Defaults to netlify/functions/sample-index.json.');
}

async function runFromCommandLine() {
	try {
		const args = process.argv.slice(2);
		const outputs = parseOutputsFromArgs(args);
		if (outputs === null) {
			return;
		}

		await generateSampleIndex({ outputs: outputs ?? DEFAULT_OUTPUTS });
	} catch (error) {
		console.error('[mcp] failed to prebuild sample index', error);
		process.exitCode = 1;
	}
}

const executedAsScript = pathToFileURL(process.argv[1] ?? '').href === import.meta.url;
if (executedAsScript) {
	void runFromCommandLine();
}
