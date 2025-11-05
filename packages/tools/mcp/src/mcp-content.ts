import { URL } from 'node:url';

export const AI_HINTS_KEY = 'ai-hints' as const;
export const AI_HINTS_MESSAGES = Object.freeze([
	'Always register KoliBri Web Components in the browser runtime before rendering them.',
	'Choose the integration guide that matches your project setup to load and bundle the components correctly.',
	'Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.',
	'Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary.',
	'Use the /http/* endpoints for plain fetches and /sse/* when you need Server-Sent Events streaming from the MCP server.',
]);

export interface SampleEntry {
	id: string;
	group?: string;
	name?: string;
	path?: string;
	code?: string;
	kind?: string;
	title?: string;
	url?: string;
	[key: string]: unknown;
}

export interface SampleIndexLike {
	entries?: SampleEntry[];
	list(query?: string, options?: { kinds?: string[] }): SampleEntry[];
	get(id: string): SampleEntry | undefined;
	generatedAt?: Date | string;
	buildMode?: string;
	counts?: {
		total?: number;
		totalSamples?: number;
		totalDocs?: number;
	};
}

export interface ContentCounts {
	total: number;
	totalSamples: number;
	totalDocs: number;
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function normalizeHints(value: unknown): string[] {
	if (Array.isArray(value)) {
		const filtered = value.map((item) => `${item ?? ''}`.trim()).filter(Boolean);
		return filtered.length > 0 ? filtered : [...AI_HINTS_MESSAGES];
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed ? [trimmed] : [...AI_HINTS_MESSAGES];
	}

	return [...AI_HINTS_MESSAGES];
}

export function withAiHints<T extends Record<string, unknown>>(body: T): T & { 'ai-hints': string[] } {
	const hints = normalizeHints(body[AI_HINTS_KEY]);
	return { ...body, [AI_HINTS_KEY]: hints } as T & { 'ai-hints': string[] };
}

export function ensureDate(value: unknown): Date {
	if (value instanceof Date) {
		return value;
	}

	if (typeof value === 'string' || typeof value === 'number') {
		const parsed = new Date(value);
		if (!Number.isNaN(parsed.getTime())) {
			return parsed;
		}
	}

	return new Date();
}

function normalizePathForRepoUrl(pathValue: unknown): string | undefined {
	if (!isNonEmptyString(pathValue)) {
		return undefined;
	}

	const normalized = pathValue
		.replace(/^[./\\]+/, '')
		.replace(/\\/g, '/')
		.trim();

	return normalized || undefined;
}

const REPO_BLOB_BASE_URL = 'https://github.com/public-ui/kolibri/blob/main/';
const REPO_DEFAULT_URL = 'https://github.com/public-ui/kolibri';

export function createCanonicalUrlFromEntry(entry: SampleEntry): string {
	if (isNonEmptyString(entry.url)) {
		return entry.url.trim();
	}

	const normalizedPath = normalizePathForRepoUrl(entry.path);
	if (!normalizedPath) {
		return REPO_DEFAULT_URL;
	}

	return `${REPO_BLOB_BASE_URL}${normalizedPath}`;
}

export function resolveEntryTitle(entry: SampleEntry = { id: '' }): string {
	if (isNonEmptyString(entry.title)) {
		return entry.title.trim();
	}

	if (isNonEmptyString(entry.name)) {
		return entry.name.trim();
	}

	if (isNonEmptyString(entry.id)) {
		return entry.id.trim();
	}

	return 'Untitled entry';
}

function computeCountsFromEntries(entries: SampleEntry[] = []): ContentCounts {
	return entries.reduce<ContentCounts>(
		(acc, entry) => {
			const kind = entry.kind ?? 'sample';
			acc.total += 1;
			if (kind === 'sample') {
				acc.totalSamples += 1;
				return acc;
			}

			if (kind === 'doc') {
				acc.totalDocs += 1;
			}

			return acc;
		},
		{ total: 0, totalSamples: 0, totalDocs: 0 },
	);
}

export function resolveCounts(index?: SampleIndexLike | null): ContentCounts {
	if (!index) {
		return computeCountsFromEntries();
	}

	const fallback = computeCountsFromEntries(index.entries ?? []);
	const source = index.counts ?? {};

	return {
		total: typeof source.total === 'number' ? source.total : fallback.total,
		totalSamples: typeof source.totalSamples === 'number' ? source.totalSamples : fallback.totalSamples,
		totalDocs: typeof source.totalDocs === 'number' ? source.totalDocs : fallback.totalDocs,
	};
}

function parseLimit(limit: unknown): number | undefined {
	if (typeof limit === 'number' && Number.isFinite(limit)) {
		return Math.max(1, Math.floor(limit));
	}

	if (typeof limit === 'string' && limit.trim()) {
		const parsed = Number.parseInt(limit.trim(), 10);
		if (Number.isFinite(parsed)) {
			return Math.max(1, parsed);
		}
	}

	return undefined;
}

function applyLimit<T>(items: T[], limit: number): T[] {
	if (!Number.isFinite(limit) || limit <= 0) {
		return items;
	}

	return items.slice(0, limit);
}

export interface EntrySummary {
	group?: string;
	id: string;
	name?: string;
	path?: string;
	kind: string;
}

export function formatEntrySummary(entry: SampleEntry): EntrySummary {
	return {
		group: entry.group,
		id: entry.id,
		name: entry.name,
		path: entry.path,
		kind: entry.kind ?? 'sample',
	};
}

export interface SamplesListOptions {
	query?: string;
	limit?: unknown;
	includeMatchCount?: boolean;
}

export interface SamplesListPayload {
	items: EntrySummary[];
	query: string;
	total: number;
	totalEntries: number;
	totalSamples: number;
	totalDocs: number;
	generatedAt: string;
	totalMatches?: number;
	returned?: number;
	limit?: number;
	'ai-hints': string[];
}

export function createSamplesListPayload(index: SampleIndexLike, counts: ContentCounts, options: SamplesListOptions = {}): SamplesListPayload {
	const normalizedQuery = isNonEmptyString(options.query) ? options.query.trim() : '';
	const items = index.list(normalizedQuery, { kinds: ['sample'] }).map(formatEntrySummary);
	const limitValue = parseLimit(options.limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);
	const payload: Record<string, unknown> = {
		items: limitedItems,
		query: normalizedQuery,
		total: limitedItems.length,
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};

	if (options.includeMatchCount) {
		payload.totalMatches = items.length;
		payload.returned = limitedItems.length;
		if (limitValue !== undefined) {
			payload.limit = limitValue;
		}
	}

	return withAiHints(payload) as SamplesListPayload;
}

export interface DocsListOptions {
	query?: string;
	limit?: unknown;
	includeMatchCount?: boolean;
}

export interface DocsListPayload {
	items: EntrySummary[];
	query: string;
	total: number;
	totalEntries: number;
	totalDocs: number;
	generatedAt: string;
	totalMatches?: number;
	returned?: number;
	limit?: number;
	'ai-hints': string[];
}

export function createDocsListPayload(index: SampleIndexLike, counts: ContentCounts, options: DocsListOptions = {}): DocsListPayload {
	const normalizedQuery = isNonEmptyString(options.query) ? options.query.trim() : '';
	const items = index.list(normalizedQuery, { kinds: ['doc'] }).map(formatEntrySummary);
	const limitValue = parseLimit(options.limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);
	const payload: Record<string, unknown> = {
		items: limitedItems,
		query: normalizedQuery,
		total: limitedItems.length,
		totalEntries: counts.totalDocs,
		totalDocs: counts.totalDocs,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	};

	if (options.includeMatchCount) {
		payload.totalMatches = items.length;
		payload.returned = limitedItems.length;
		if (limitValue !== undefined) {
			payload.limit = limitValue;
		}
	}

	return withAiHints(payload) as DocsListPayload;
}

export interface SampleDetailPayload {
	id: string;
	group?: string;
	name?: string;
	path?: string;
	code?: string;
	kind: string;
	generatedAt: string;
	'ai-hints': string[];
}

export function createSampleDetailPayload(entry: SampleEntry, index: SampleIndexLike): SampleDetailPayload {
	return withAiHints({
		id: entry.id,
		group: entry.group,
		name: entry.name,
		path: entry.path,
		code: entry.code,
		kind: entry.kind ?? 'sample',
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	}) as SampleDetailPayload;
}

export interface DocDetailPayload {
	id: string;
	group?: string;
	name?: string;
	path?: string;
	code?: string;
	kind: string;
	generatedAt: string;
	'ai-hints': string[];
}

export function createDocDetailPayload(entry: SampleEntry, index: SampleIndexLike): DocDetailPayload {
	return withAiHints({
		id: entry.id,
		group: entry.group,
		name: entry.name,
		path: entry.path,
		code: entry.code,
		kind: entry.kind ?? 'doc',
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	}) as DocDetailPayload;
}

export interface SearchOptions {
	query?: string;
	kinds?: string[];
	limit?: unknown;
}

export interface SearchPayload {
	query: string;
	kinds: string[];
	totalMatches: number;
	returned: number;
	generatedAt: string;
	counts: ContentCounts;
	items: EntrySummary[];
	limit?: number;
	'ai-hints': string[];
}

export function sanitizeKinds(input: unknown): string[] | undefined {
	if (!Array.isArray(input)) {
		return undefined;
	}

	const normalized = input.map((value) => `${value ?? ''}`.trim().toLowerCase()).filter((value) => value === 'sample' || value === 'doc');

	const unique = Array.from(new Set(normalized));
	return unique.length > 0 ? unique : undefined;
}

export function createSearchPayload(index: SampleIndexLike, counts: ContentCounts, options: SearchOptions): SearchPayload {
	const normalizedQuery = isNonEmptyString(options.query) ? options.query.trim() : '';
	if (!normalizedQuery) {
		throw new TypeError('The "query" parameter must be a non-empty string.');
	}

	const normalizedKinds = sanitizeKinds(options.kinds);
	const items = index.list(normalizedQuery, { kinds: normalizedKinds }).map(formatEntrySummary);
	const limitValue = parseLimit(options.limit);
	const limitedItems = applyLimit(items, limitValue ?? items.length);

	return withAiHints({
		query: normalizedQuery,
		kinds: normalizedKinds ?? ['sample', 'doc'],
		totalMatches: items.length,
		returned: limitedItems.length,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
		counts,
		items: limitedItems,
		...(limitValue !== undefined ? { limit: limitValue } : {}),
	}) as SearchPayload;
}

function createSnippetFromText(text: unknown, maxLength = 200): string | undefined {
	if (!isNonEmptyString(text)) {
		return undefined;
	}

	const normalized = text.replace(/\s+/g, ' ').trim();
	if (!normalized) {
		return undefined;
	}

	if (normalized.length <= maxLength) {
		return normalized;
	}

	return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
}

export interface SearchToolResultItem {
	id: string;
	title: string;
	url: string;
	metadata?: Record<string, unknown>;
}

export interface SearchToolResult {
	results: SearchToolResultItem[];
}

export function createSearchToolResult(payload: SearchPayload, context: { index: SampleIndexLike }): SearchToolResult {
	const items = Array.isArray(payload.items) ? payload.items : [];
	const results = items
		.map<SearchToolResultItem | null>((item) => {
			if (!isNonEmptyString(item.id)) {
				return null;
			}

			const metadata: Record<string, unknown> = {};
			const kind = item.kind ?? 'sample';
			if (kind) {
				metadata.kind = kind;
			}

			if (item.group) {
				metadata.group = item.group;
			}

			if (item.path) {
				metadata.path = item.path;
			}

			const entry = context.index.get(item.id);
			const snippet = entry ? createSnippetFromText(entry.code) : undefined;
			if (snippet) {
				metadata.snippet = snippet;
			}

			return {
				id: item.id,
				title: resolveEntryTitle(item as SampleEntry),
				url: createCanonicalUrlFromEntry(item as SampleEntry),
				...(Object.keys(metadata).length > 0 ? { metadata } : {}),
			};
		})
		.filter((value): value is SearchToolResultItem => value !== null);

	return { results };
}

export function createToolTextContent(payload: unknown) {
	return [
		{
			type: 'text' as const,
			text: JSON.stringify(payload),
		},
	];
}

export interface FetchToolPayload {
	id?: string;
	title: string;
	text: string;
	url: string;
	metadata?: Record<string, unknown>;
	'ai-hints': string[];
}

function compactMetadata(metadata: Record<string, unknown> = {}): Record<string, unknown> {
	return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

export function createFetchToolPayload(entry: SampleEntry | undefined, index: SampleIndexLike): FetchToolPayload {
	const text = isNonEmptyString(entry?.code) ? entry?.code : JSON.stringify(entry?.code ?? '', null, 2);
	const metadata = compactMetadata({
		kind: entry?.kind ?? 'sample',
		group: entry?.group,
		path: entry?.path,
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	});

	return withAiHints({
		id: entry?.id,
		title: resolveEntryTitle(entry ?? { id: '' }),
		text,
		url: createCanonicalUrlFromEntry(entry ?? { id: '' }),
		...(Object.keys(metadata).length > 0 ? { metadata } : {}),
	}) as FetchToolPayload;
}

export interface HealthPayload {
	status: 'ok' | 'error';
	healthy: boolean;
	totalEntries: number;
	totalSamples: number;
	totalDocs: number;
	message: string;
	generatedAt: string;
	debug: {
		indexGeneratedAt: string;
		entriesLength: number;
		firstFewEntries: string[];
	};
	'ai-hints': string[];
}

export function createHealthPayload(index: SampleIndexLike, counts: ContentCounts): HealthPayload {
	const generatedAt = ensureDate(index.generatedAt).toISOString();
	const entries = Array.isArray(index.entries) ? index.entries : [];
	const healthy = counts.total > 0;

	return withAiHints({
		status: healthy ? 'ok' : 'error',
		healthy,
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		message: healthy ? `System healthy with ${counts.total} entries available` : 'No entries found - system may not be properly initialized',
		generatedAt,
		debug: {
			indexGeneratedAt: generatedAt,
			entriesLength: entries.length,
			firstFewEntries: entries.slice(0, 3).map((entry) => entry.id),
		},
	}) as HealthPayload;
}

export function resolveIdFromArguments(args: unknown): string {
	if (typeof args === 'string') {
		return args.trim();
	}

	if (Array.isArray(args)) {
		const first = args.find((value) => typeof value === 'string' && value.trim());
		if (first) {
			return first.trim();
		}
	}

	if (isPlainObject(args)) {
		if (typeof args.id === 'string' && args.id.trim()) {
			return args.id.trim();
		}
		if (typeof args.name === 'string' && args.name.trim()) {
			return args.name.trim();
		}
	}

	return '';
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (value === null || typeof value !== 'object') {
		return false;
	}

	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}

export function normalizeSearchArguments(args: unknown): SearchOptions {
	if (typeof args === 'string') {
		return { query: args };
	}

	if (Array.isArray(args) && args.length > 0) {
		const first = args.find((value) => typeof value === 'string' && value.trim());
		if (first) {
			return { query: first };
		}
	}

	if (isPlainObject(args)) {
		return args as SearchOptions;
	}

	return {};
}

export function createOverviewPayload(index: SampleIndexLike, counts: ContentCounts) {
	const generatedAt = ensureDate(index?.generatedAt).toISOString();
	return withAiHints({
		message: 'KoliBri MCP backend is running.',
		totals: {
			total: counts.total,
			samples: counts.totalSamples,
			docs: counts.totalDocs,
		},
		totalEntries: counts.total,
		totalSamples: counts.totalSamples,
		totalDocs: counts.totalDocs,
		generatedAt,
		buildMode: index?.buildMode ?? 'runtime',
	});
}

export function createInitializePayload(
	index: SampleIndexLike,
	counts: ContentCounts,
	serverInfo: {
		name: string;
		version: string;
		description?: string;
		homepage?: string;
	},
) {
	return withAiHints({
		protocol: '2025-03-26',
		server: serverInfo,
		totals: {
			total: counts.total,
			samples: counts.totalSamples,
			docs: counts.totalDocs,
		},
		generatedAt: ensureDate(index.generatedAt).toISOString(),
	});
}

export function toResourceContents(uri: URL | string, payload: unknown) {
	const url = typeof uri === 'string' ? uri : uri.href;
	return {
		uri: url,
		text: JSON.stringify(payload, null, 2),
		mimeType: 'application/json',
	} as const;
}
