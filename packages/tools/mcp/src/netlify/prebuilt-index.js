import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDynamicSampleIndex, createSampleIndexFromData } from '../prebuilt/sample-index-utils.js';

let cachedIndex;
let cachedSource;
let currentStrategy = 'prebuilt';

function getCandidatePaths() {
	const candidates = new Set();
	if (process.env.KOLIBRI_MCP_INDEX_PATH) {
		candidates.add(process.env.KOLIBRI_MCP_INDEX_PATH);
	}
	if (process.env.NETLIFY_FUNCTIONS_DIR) {
		candidates.add(path.join(process.env.NETLIFY_FUNCTIONS_DIR, 'sample-index.json'));
	}
	if (process.env.LAMBDA_TASK_ROOT) {
		candidates.add(path.join(process.env.LAMBDA_TASK_ROOT, 'sample-index.json'));
	}

	const defaultUrls = ['../../netlify/functions/sample-index.json', '../../netlify/sample-index.json'];
	for (const relative of defaultUrls) {
		const url = new URL(relative, import.meta.url);
		candidates.add(fileURLToPath(url));
	}

	return Array.from(candidates);
}

async function readJsonFile(filePath) {
	try {
		const content = await readFile(filePath, 'utf8');
		return JSON.parse(content);
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
			return undefined;
		}
		throw error;
	}
}

async function loadPrebuiltData() {
	const candidates = getCandidatePaths();
	for (const candidate of candidates) {
		if (!candidate) {
			continue;
		}
		try {
			const data = await readJsonFile(candidate);
			if (data) {
				return { data, source: candidate };
			}
		} catch (error) {
			console.warn(`[mcp] failed to load prebuilt index from ${candidate}:`, error);
		}
	}
	return undefined;
}

export async function loadPrebuiltIndex() {
	if (cachedIndex) {
		return cachedIndex;
	}

	const prebuilt = await loadPrebuiltData();
	if (prebuilt) {
		cachedSource = prebuilt.source;
		currentStrategy = 'prebuilt';
		cachedIndex = createSampleIndexFromData(prebuilt.data);
		console.log(`[mcp] loaded sample index from ${cachedSource}`);
		return cachedIndex;
	}

	console.warn('[mcp] no prebuilt sample index found – rebuilding on demand');
	cachedIndex = await buildDynamicSampleIndex();
	cachedSource = 'dynamic-build';
	currentStrategy = 'dynamic';
	return cachedIndex;
}

export async function refreshPrebuiltIndex() {
	if (currentStrategy === 'dynamic') {
		cachedIndex = await buildDynamicSampleIndex();
		return cachedIndex;
	}

	cachedIndex = undefined;
	return loadPrebuiltIndex();
}

export function getCurrentIndexSource() {
	return cachedSource;
}

export function getCandidateIndexPaths() {
	return getCandidatePaths();
}
