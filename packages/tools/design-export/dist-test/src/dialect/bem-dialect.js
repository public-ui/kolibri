const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/** `has-closer` → `Closer`, `label-align` → `Label Align`. */
export function propertyName(attribute) {
	return attribute
		.replace(/^has-/, '')
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}
/** Literal values of an attribute type: `"card" | "msg" | undefined` → `card`, `msg`; `0 | 1` → `0`, `1`. */
export function literalValues(type) {
	if (!type) return [];
	return type
		.split('|')
		.map((part) => part.trim())
		.filter((part) => /^"[^"]*"$/.test(part) || /^-?\d+(\.\d+)?$/.test(part))
		.map((part) => part.replace(/^"|"$/g, ''));
}
/**
 * Reads the design properties of one block from its modifiers and the attributes of its web
 * component. Without a public web component (an embedded block such as `kol-span`) the
 * attributes are unknown: modifiers are read by their form alone and not checked.
 */
export function readDialect(bem, api) {
	const types = new Map(Object.entries(api?.attributeTypes ?? {}).map(([name, type]) => [name.replace(/^_/, ''), type]));
	for (const name of api?.attributes ?? []) if (!types.has(name.replace(/^_/, ''))) types.set(name.replace(/^_/, ''), '');
	const findings = [];
	const booleans = [];
	const enums = new Map();
	const report = (modifier, rule, suggestion) => findings.push({ block: bem.block, modifier, rule, suggestion });
	for (const modifier of bem.modifiers) {
		// A camelCase modifier is reported and read in its kebab-case form, so the library still builds.
		const name = KEBAB.test(modifier) ? modifier : modifier.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
		if (name !== modifier) report(modifier, 'kebab-case', name);
		if (name.startsWith('is-')) continue;
		if (api === undefined) {
			booleans.push({ kind: 'boolean', name: propertyName(name), attribute: name, modifier });
			continue;
		}
		const boolean = [name, name.replace(/^has-/, '')].find((candidate) => types.has(candidate) && /\bboolean\b/.test(types.get(candidate) ?? 'boolean'));
		if (boolean) {
			booleans.push({ kind: 'boolean', name: propertyName(name), attribute: boolean, modifier });
			continue;
		}
		const attribute = longestAttributePrefix(name, types);
		if (attribute) {
			const value = name.slice(attribute.length + 1);
			const allowed = literalValues(types.get(attribute));
			if (allowed.length > 0 && !allowed.includes(value)) report(modifier, 'unknown-value', `_${attribute} accepts ${allowed.join(', ')}`);
			const values = enums.get(attribute) ?? {};
			values[value] = modifier;
			enums.set(attribute, values);
			continue;
		}
		report(modifier, 'no-attribute', suggest(name, types));
	}
	const properties = [
		...[...enums.entries()]
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([attribute, modifiers]) => ({
				kind: 'enum',
				name: propertyName(attribute),
				attribute,
				modifiers,
				values: Object.keys(modifiers).sort(),
			})),
		...booleans.sort((a, b) => a.name.localeCompare(b.name)),
	];
	if (bem.elements.includes('interactive-element')) {
		properties.push({ kind: 'state', name: 'Hover', state: 'hover' }, { kind: 'state', name: 'Focus', state: 'focus' });
	}
	return { block: bem.block, checked: api !== undefined, properties, findings };
}
/** The longest attribute `a` with `modifier = a-<value>`; `label-align-left` prefers `label-align` over `label`. */
function longestAttributePrefix(modifier, types) {
	const parts = modifier.split('-');
	for (let length = parts.length - 1; length > 0; length--) {
		const candidate = parts.slice(0, length).join('-');
		if (types.has(candidate)) return candidate;
	}
	return undefined;
}
/**
 * A modifier without an attribute of its name is the value of another attribute written without
 * its prefix (`vertical` of `_orientation`, `h1` of `_level`), the negation of a boolean
 * (`standalone` = `_inline` false) or internal state (`open` of a dropdown).
 */
function suggest(modifier, types) {
	const digit = /^h(\d)$/.exec(modifier);
	for (const [attribute, type] of [...types.entries()].sort(([a], [b]) => a.localeCompare(b))) {
		const values = literalValues(type);
		if (values.includes(modifier)) return `${attribute}-${modifier}`;
		if (digit && values.includes(digit[1])) return `${attribute}-${digit[1]}`;
	}
	if (modifier === 'standalone' && types.has('inline')) return 'remove: the absence of `inline` already says it';
	return `is-${modifier} (internal state) or <attribute>-${modifier}`;
}
