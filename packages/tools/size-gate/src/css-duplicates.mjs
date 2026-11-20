import postcss from 'postcss';

function contextOf(node) {
	const chain = [];
	for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
		chain.unshift(parent.type === 'atrule' ? `@${parent.name} ${parent.params}` : parent.selector);
	}
	return chain.join(' > ');
}

function declarationsOf(node) {
	return (node.nodes ?? [])
		.filter((child) => child.type === 'decl')
		.map((decl) => `${decl.prop}:${decl.value}${decl.important ? '!important' : ''}`)
		.join(';');
}

/**
 * Class prefixes of the first and the last class of a selector (`.kol-form-field__label .fa-address-book:before`
 * → `.kol-* … .fa-*`), so that the thousands of rules of an icon font collapse into one readable label.
 */
export function selectorFamily(selector) {
	const first = selector.split(',')[0];
	const prefixes = [...first.matchAll(/\.([a-zA-Z0-9]+)([-_]{1,2})/g)].map((match) => `.${match[1]}${match[2]}*`);
	if (prefixes.length > 0) {
		const head = prefixes[0];
		const tail = prefixes[prefixes.length - 1];
		return head === tail ? head : `${head} … ${tail}`;
	}
	const compact = first.replace(/\s+/g, ' ').trim();
	return compact.length > 40 ? `${compact.slice(0, 39)}…` : compact;
}

/**
 * Splits a style sheet into comparable units: the own declarations of every rule and every at-rule
 * without nested rules (`@font-face`, `@property`), each with the selectors and at-rules around it.
 * Comments and whitespace do not count. `bytes` is the length of the normalized unit.
 */
export function cssUnits(root) {
	const units = [];
	root.walk((node) => {
		if (node.type === 'rule') {
			const declarations = declarationsOf(node);
			if (declarations !== '') {
				const key = `${contextOf(node)} { ${node.selector} { ${declarations} } }`;
				const keyframes = node.parent?.type === 'atrule' && /keyframes$/.test(node.parent.name);
				const family = keyframes ? `@keyframes ${node.parent.params}` : selectorFamily(node.selector);
				units.push({ bytes: Buffer.byteLength(key), example: node.selector.split(',')[0].trim(), family, key });
			}
		} else if (node.type === 'atrule' && node.name !== 'charset' && !(node.nodes ?? []).some((child) => child.type !== 'decl')) {
			const key = `${contextOf(node)} { @${node.name} ${node.params} { ${declarationsOf(node)} } }`;
			units.push({ bytes: Buffer.byteLength(key), example: `@${node.name} ${node.params}`.trim(), family: `@${node.name}`, key });
		}
	});
	return units;
}

export function parseCss(css) {
	return postcss.parse(css);
}

export function stripComments(root) {
	const clone = root.clone();
	clone.walkComments((comment) => {
		comment.remove();
	});
	return clone.toString();
}

/**
 * Finds the CSS that several style sheets carry as identical copies. Units that occur in the same set of
 * at least `minSheets` sheets form one group — typically everything one Sass mixin emits. The redundant
 * bytes of a group are its bytes per sheet times every copy after the first.
 *
 * `sheets` maps a sheet name to its parsed root.
 */
export function findDuplicateGroups(sheets, { minSheets = 3 } = {}) {
	const occurrences = new Map();
	for (const [name, root] of sheets) {
		for (const unit of cssUnits(root)) {
			const entry = occurrences.get(unit.key) ?? { bytes: unit.bytes, example: unit.example, family: unit.family, sheets: new Set() };
			entry.sheets.add(name);
			occurrences.set(unit.key, entry);
		}
	}

	const groups = new Map();
	for (const entry of occurrences.values()) {
		if (entry.sheets.size >= minSheets) {
			const sheetNames = [...entry.sheets].sort();
			const signature = sheetNames.join(',');
			const group = groups.get(signature) ?? { bytes: 0, families: new Map(), rules: 0, sheets: sheetNames };
			group.bytes += entry.bytes;
			group.rules += 1;
			const family = group.families.get(entry.family) ?? { example: entry.example, rules: 0 };
			family.rules += 1;
			group.families.set(entry.family, family);
			groups.set(signature, group);
		}
	}

	return [...groups.values()]
		.map((group) => {
			const families = [...group.families].sort((a, b) => b[1].rules - a[1].rules);
			return {
				bytesPerSheet: group.bytes,
				example: families[0][1].example,
				families: families.slice(0, 3).map(([family, { rules }]) => ({ family, rules })),
				label: families
					.slice(0, 3)
					.map(([family]) => family)
					.join(', '),
				redundantBytes: group.bytes * (group.sheets.length - 1),
				rules: group.rules,
				sheets: group.sheets,
			};
		})
		.sort((a, b) => b.redundantBytes - a.redundantBytes);
}
