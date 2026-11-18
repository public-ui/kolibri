import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { buildGraph, loadCounts, staticClosure } from './graph.mjs';
import { ownerOf } from './package-of.mjs';
import { attributeFile, readGenerated } from './read-map.mjs';
import { addSizes, measure, prorate, ZERO } from './sizes.mjs';

const ENTRY_SUFFIX = '.entry.js';

/**
 * Files every page loads that uses the lazy loader (`defineCustomElements`) or the package entry
 * (`register`, `KoliBri`).
 */
const BOOT_FILES = ['index.js', 'loader.js'];

/**
 * Thresholds of the analysis. The tolerance itself lives in the baseline.
 */
const COMPONENT_DEFAULTS = Object.freeze({
	/** Share of all entries that must load a chunk to count it to the core. */
	coreShare: 0.5,
	/** gzip bytes from which a dependency in a shared chunk counts as a hotspot. */
	hotspotGzip: 5 * 1024,
	/** Factor of the median incremental entry size from which an entry is an outlier. */
	outlierFactor: 2,
});

function sumSizes(files, sizesOf) {
	return [...files].reduce((sum, file) => addSizes(sum, sizesOf(file)), ZERO);
}

function median(values) {
	const sorted = [...values].sort((a, b) => a - b);
	if (sorted.length === 0) {
		return 0;
	}
	const middle = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0 ? Math.round((sorted[middle - 1] + sorted[middle]) / 2) : sorted[middle];
}

async function readChunks(dir, mapDir) {
	const chunks = new Map();
	const files = [];
	for (const file of readdirSync(dir)
		.filter((name) => name.endsWith('.js'))
		.sort()) {
		const path = join(dir, file);
		const code = readGenerated(path);
		chunks.set(file, code);
		const sizes = measure(code);
		const attribution = await attributeFile(path, code, mapDir);
		const modules = [];
		if (attribution) {
			for (const [source, raw] of attribution) {
				modules.push({ ...ownerOf(source), sizes: prorate(sizes, raw) });
			}
			modules.sort((a, b) => b.sizes.raw - a.sizes.raw);
		}
		files.push({ file, modules, sizes, sourceMap: attribution !== null });
	}
	return { chunks, files };
}

/**
 * Analyses the lazy-loading build of the components package (`dist/esm`). `options.mapDir` names the
 * directory of the source maps when they do not sit next to the chunks.
 *
 * - **core**: the boot files with their static imports plus every chunk that at least `coreShare` of
 *   all entries load. A page that uses any component pays for it once.
 * - **entry**: what one component adds on top of the core — its `*.entry.js` and every chunk of its
 *   static closure outside the core.
 * - **hotspot**: a third-party package with at least `hotspotGzip` in a chunk that more than one entry
 *   loads. Every entry that loads the chunk pays for the package, whether it needs it or not.
 * - **candidate**: a hotspot, duplicate or outlier entry, ranked by its impact in gzip bytes: the
 *   package size, the size of the extra copies or the excess over the median entry.
 * - **duplicate**: a source module that the bundler copied into more than one chunk.
 */
export async function analyzeComponents(dir, options = {}) {
	const settings = { ...COMPONENT_DEFAULTS, ...options };
	const { chunks, files } = await readChunks(dir, settings.mapDir);
	const byFile = new Map(files.map((entry) => [entry.file, entry]));
	const sizesOf = (file) => byFile.get(file).sizes;

	const graph = buildGraph(chunks);
	const entries = [...chunks.keys()].filter((file) => file.endsWith(ENTRY_SUFFIX));
	const counts = loadCounts(graph, entries);

	const core = new Set();
	for (const boot of BOOT_FILES.filter((file) => chunks.has(file))) {
		staticClosure(graph, boot).forEach((file) => core.add(file));
	}
	for (const [file, count] of counts) {
		if (!file.endsWith(ENTRY_SUFFIX) && entries.length > 0 && count / entries.length >= settings.coreShare) {
			staticClosure(graph, file).forEach((closureFile) => core.add(closureFile));
		}
	}

	const entryReports = entries.map((file) => {
		const closure = staticClosure(graph, file);
		const own = [...closure].filter((chunk) => !core.has(chunk));
		return {
			chunks: own.sort(),
			file,
			sizes: sumSizes(own, sizesOf),
			tag: file.slice(0, -ENTRY_SUFFIX.length),
		};
	});
	const entryMedian = median(entryReports.map((entry) => entry.sizes.gzip));

	for (const entry of files) {
		entry.loadCount = counts.get(entry.file) ?? 0;
		entry.role = core.has(entry.file) ? 'core' : entry.file.endsWith(ENTRY_SUFFIX) ? 'entry' : 'shared';
		entry.dynamicImports = graph.get(entry.file).dynamic;
	}

	const hotspots = [];
	const occurrences = new Map();
	for (const entry of files) {
		const perPackage = new Map();
		for (const module of entry.modules) {
			if (module.kind === 'dependency') {
				perPackage.set(module.group, addSizes(perPackage.get(module.group) ?? ZERO, module.sizes));
			}
			if (module.kind === 'own' || module.kind === 'dependency') {
				occurrences.set(module.module, [...(occurrences.get(module.module) ?? []), { file: entry.file, sizes: module.sizes }]);
			}
		}
		const loaders = entry.role === 'core' ? entries.length : entry.loadCount;
		for (const [name, sizes] of perPackage) {
			if (sizes.gzip >= settings.hotspotGzip && loaders > 1) {
				hotspots.push({ file: entry.file, loadCount: loaders, name, role: entry.role, sizes });
			}
		}
	}
	hotspots.sort((a, b) => b.sizes.gzip - a.sizes.gzip);

	const duplicates = [...occurrences]
		.filter(([, list]) => list.length > 1)
		.map(([module, list]) => {
			const sorted = [...list].sort((a, b) => b.sizes.raw - a.sizes.raw);
			const extra = sorted.slice(1).reduce((sum, item) => addSizes(sum, item.sizes), ZERO);
			return { extra, files: sorted.map((item) => item.file), module };
		})
		.sort((a, b) => b.extra.gzip - a.extra.gzip);

	const outliers = entryReports
		.filter((entry) => entryMedian > 0 && entry.sizes.gzip > entryMedian * settings.outlierFactor)
		.sort((a, b) => b.sizes.gzip - a.sizes.gzip);

	const coreSizes = sumSizes(core, sizesOf);
	const total = sumSizes(byFile.keys(), sizesOf);

	const metrics = {
		core: { label: 'Core (every page)', rule: 'percent-or-bytes', sizes: coreSizes },
		total: { label: 'Total dist/esm', rule: 'percent', sizes: total },
	};
	for (const entry of entryReports) {
		metrics[`entry:${entry.tag}`] = { label: entry.tag, rule: 'percent-or-bytes', sizes: entry.sizes };
	}

	const candidates = [
		...hotspots.map((hotspot) => ({
			action: `Load \`${hotspot.name}\` only where it is needed (dynamic import or own chunk).`,
			kind: 'hotspot',
			impactGzip: hotspot.sizes.gzip,
			subject: `${hotspot.name} in ${hotspot.file} (${hotspot.role}, ${hotspot.loadCount}/${entries.length} entries)`,
		})),
		...duplicates.map((duplicate) => ({
			action: `Move \`${duplicate.module}\` into one shared chunk.`,
			kind: 'duplicate',
			impactGzip: duplicate.extra.gzip,
			subject: `${duplicate.module} (${duplicate.files.length}×)`,
		})),
		...outliers.map((entry) => ({
			action: `Adds ${Math.round(entry.sizes.gzip / entryMedian)}× the median entry on top of the core; shrink or share its largest modules (see the treemap).`,
			kind: 'outlier',
			impactGzip: entry.sizes.gzip - entryMedian,
			subject: entry.tag,
		})),
	].sort((a, b) => b.impactGzip - a.impactGzip);

	return {
		candidates,
		core: { files: [...core].sort(), sizes: coreSizes },
		duplicates,
		entries: entryReports,
		entryMedian,
		files,
		hotspots,
		kind: 'components',
		metrics,
		sets: {
			duplicates: duplicates.map((duplicate) => duplicate.module),
			hotspots: [...new Set(hotspots.map((hotspot) => hotspot.name))],
		},
		sourceMaps: files.length > 0 && files.every((entry) => entry.sourceMap),
		total,
	};
}
