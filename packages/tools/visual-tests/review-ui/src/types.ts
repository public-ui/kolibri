/* Shapes written by scripts/visual-review/merge-reports.mjs (report.json) and update-review.mjs (status.json). */

export type ItemStatus = 'unchanged' | 'changed' | 'added' | 'removed' | 'error';
export type ReviewState = 'open' | 'approved' | 'rejected';

export interface Item {
	name: string;
	route: string;
	status: ItemStatus;
	hash: string;
	diffPixels?: number;
	diffRatio?: number;
	sizeMismatch?: { expected: [number, number]; actual: [number, number] };
	message?: string;
	expected?: string;
	actual?: string;
	diff?: string;
}

export interface Package {
	package: string;
	themeDir: string;
	summary: Record<ItemStatus, number>;
	digest: string | null;
	items: Item[];
	errors: { test: string; route: string; message: string }[];
}

interface Baseline {
	sha: string | null;
	ref: string | null;
	image: string | null;
	playwright: string | null;
	fallback: string | null;
	distance: number | null;
	imageMismatch: boolean;
	consistent: boolean;
}

export interface Report {
	schema: number;
	pr: number;
	head: string;
	repository: string | null;
	runId: number | null;
	generatedAt: string;
	digest: string;
	baseline: Baseline | null;
	summary: Record<ItemStatus, number>;
	packages: Package[];
}

export interface StatusFile {
	state: 'success' | 'pending' | 'failure';
	description: string;
	computedAt: string;
	head: string;
	digest: string;
	counts: { changes: number; open: number; approved: number; rejected: number; routeErrors: number; errorItems: number };
	reviewers: string[];
	items: Record<string, { state: ReviewState; by?: string; notes: { by: string; text: string }[] }>;
}

/** One reviewer's decisions – the JSON block of the reviewer comment. */
export interface ReviewDraft {
	approveAll?: { digest: string };
	approvals: { item: string; hash: string }[];
	rejects: { item: string; hash: string }[];
	notes: { item: string; hash?: string; text: string }[];
}

/** An item with the keys the review works with. */
export interface Entry {
	key: string;
	pkg: Package;
	item: Item;
}

export function entryKey(pkg: Package, item: Item): string {
	return `${pkg.package}/${item.name}`;
}
