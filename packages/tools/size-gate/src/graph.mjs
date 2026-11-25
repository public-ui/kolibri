const STATIC_IMPORT = /\b(?:import|export)\s*(?:[^'"`;()]*?\bfrom\s*)?["'](\.\/[^"']+)["']/g;
const DYNAMIC_IMPORT = /\bimport\s*\(\s*["'](\.\/[^"']+)["']\s*\)/g;

function collect(regex, code, files) {
	const found = new Set();
	for (const match of code.matchAll(regex)) {
		const file = match[1].slice(2);
		if (files.has(file)) {
			found.add(file);
		}
	}
	return [...found].sort();
}

/**
 * Reads the relative imports of the chunks of one output directory.
 * `chunks` maps a file name to its code. Imports of files outside the map are ignored.
 */
export function buildGraph(chunks) {
	const files = new Set(chunks.keys());
	const graph = new Map();
	for (const [file, code] of chunks) {
		graph.set(file, { dynamic: collect(DYNAMIC_IMPORT, code, files), static: collect(STATIC_IMPORT, code, files) });
	}
	return graph;
}

/**
 * Returns the file and every chunk it loads through static imports, which the browser fetches before the
 * module runs. Dynamic imports load on demand and stay outside the closure.
 */
export function staticClosure(graph, file) {
	const seen = new Set();
	const stack = [file];
	while (stack.length > 0) {
		const current = stack.pop();
		if (!seen.has(current) && graph.has(current)) {
			seen.add(current);
			stack.push(...graph.get(current).static);
		}
	}
	return seen;
}

/**
 * Counts for every chunk how many of the given entries load it through their static closure.
 */
export function loadCounts(graph, entries) {
	const counts = new Map([...graph.keys()].map((file) => [file, 0]));
	for (const entry of entries) {
		for (const file of staticClosure(graph, entry)) {
			counts.set(file, counts.get(file) + 1);
		}
	}
	return counts;
}
