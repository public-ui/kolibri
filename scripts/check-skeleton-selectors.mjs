#!/usr/bin/env node
/**
 * Guard for the two selector mistakes that the skeleton migration makes easy to write and
 * impossible to see in a screenshot.
 *
 * Since the migration, the block class sits on a wrapper `<div>` and the interactive element is a
 * child of it:
 *
 *     <div class="kol-button kol-button--primary">
 *       <button class="kol-button__button">…</button>
 *     </div>
 *
 * Two failure modes follow, and neither shows up in a visual snapshot, because snapshots photograph
 * resting states:
 *
 * 1. **Modifier-glued element.** Inside a modifier block, `&__button` expands to
 *    `.kol-button--primary__button` — a class that exists nowhere, so the rule is silently dead.
 *    The fix is a plain descendant: `& #{$root}__button` / `.#{$block}__#{$element}`.
 *
 * 2. **State predicate on the carrier.** `:focus`, `:focus-visible` and `:disabled` never match the
 *    wrapper `div`, so those rules are dead. Worse, `:not(:disabled)` / `:not([disabled])` are
 *    always *true* on the wrapper, so a combined predicate like `.kol-button:not([disabled]):hover`
 *    does not merely stop matching — it inverts, and disabled buttons gain hover styling.
 *
 * `:hover`, `:active` and `:focus-within` are deliberately not flagged: they match the wrapper
 * through ancestor propagation, so they keep working where they are.
 *
 * The checker parses each stylesheet into a block tree, resolves Sass `&` nesting textually and
 * expands same-file `@include`s, so a mixin body is checked in the selector context it is used in.
 * Reports file, line and resolved selector; exit code 1 on any finding.
 *
 * Usage: node scripts/check-skeleton-selectors.mjs [--json]
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SCAN_ROOTS = ['packages/components/src', 'packages/themes'];

/** Blocks whose class carrier became a wrapper element with the skeleton migration. */
const WRAPPER_BLOCKS = ['kol-button', 'kol-link'];

/** Pseudo-classes that never match the wrapper — they do not propagate to ancestors. */
const DEAD_ON_WRAPPER = [':focus-visible', ':focus', ':disabled'];

/** Negated predicates that are always true on the wrapper, so combined rules invert. */
const INVERTING_ON_WRAPPER = [':not(:disabled)', ':not([disabled]'];

/*
 * Interpolations are normalised to stable placeholders so the resolver can work on plain strings.
 * `#{$root}` is the captured block carrier (`$root: &;`), so it stands for the block class.
 */
const INTERPOLATION_PLACEHOLDERS = [
	[/#\{\$block-classname\}/g, 'kol-BLOCK'],
	[/#\{\$block\}/g, 'kol-BLOCK'],
	[/#\{\$root\}/g, '.kol-BLOCK'],
	[/#\{\$interactive-element-selector\}/g, '.kol-BLOCK__ELEMENT'],
	[/#\{\$interactive-element\}/g, 'ELEMENT'],
	[/#\{[^}]*\}/g, 'X'],
];

/**
 * Sass variables that switch a mixin between the two block shapes — with and without an inner
 * interactive element. The checker cannot evaluate `@if`, so it would walk both branches and report
 * the branch that does not apply. A branch conditioned on one of these is the author's explicit
 * handling of both shapes, and in the "no inner element" branch the class carrier legitimately *is*
 * the interactive element.
 */
const SHAPE_SWITCH_VARIABLES = ['$interactive-element', '$interactive-suffix', '$anchor-scoped'];

/** At-rules that are transparent for the selector context. */
const AT_RULE_PASSTHROUGH = /^@(media|supports|layer|if|else|each|for|while)\b/;
/** At-rules whose block is not a rule and carries no selector context. */
const AT_RULE_OPAQUE = /^@(keyframes|font-face|property)\b/;

function collectScssFiles(dir, out = []) {
	for (const entry of readdirSync(dir)) {
		if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) {
			continue;
		}
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			collectScssFiles(full, out);
		} else if (entry.endsWith('.scss')) {
			out.push(full);
		}
	}
	return out;
}

function stripComments(source) {
	// Both comment kinds are blanked rather than removed so line numbers survive.
	return source
		.replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '))
		.replace(/\/\/[^\n]*/g, (match) => ' '.repeat(match.length));
}

function normaliseInterpolations(text) {
	let result = text;
	for (const [pattern, replacement] of INTERPOLATION_PLACEHOLDERS) {
		result = result.replace(pattern, replacement);
	}
	return result;
}

/**
 * Parses a stylesheet into a tree of `{ header, line, children }` blocks and
 * `{ statement, line }` leaves. Interpolations are normalised first — `#{…}` contains a brace and
 * would otherwise be read as a block opener.
 */
function parseBlocks(source) {
	const text = normaliseInterpolations(stripComments(source));
	const root = { header: '', line: 1, children: [] };
	const stack = [root];
	let buffer = '';
	let bufferLine = 1;
	let line = 1;

	const flushBufferStart = () => {
		bufferLine = line;
	};

	for (const char of text) {
		if (char === '\n') {
			line++;
		}
		if (char === '{') {
			const node = { header: buffer.trim(), line: bufferLine, children: [] };
			stack[stack.length - 1].children.push(node);
			stack.push(node);
			buffer = '';
			flushBufferStart();
			continue;
		}
		if (char === '}') {
			if (stack.length > 1) {
				stack.pop();
			}
			buffer = '';
			flushBufferStart();
			continue;
		}
		if (char === ';') {
			const statement = buffer.trim();
			if (statement) {
				stack[stack.length - 1].children.push({ statement, line: bufferLine });
			}
			buffer = '';
			flushBufferStart();
			continue;
		}
		if (buffer === '' && !/\s/.test(char)) {
			bufferLine = line;
		}
		buffer += char;
	}
	return root;
}

/** Collects `@mixin name(...)` definitions of one file, so `@include name` can be expanded. */
function collectMixins(node, into = new Map()) {
	for (const child of node.children ?? []) {
		if (child.header) {
			const match = /^@mixin\s+([\w-]+)/.exec(child.header);
			if (match) {
				into.set(match[1], child);
			}
			collectMixins(child, into);
		}
	}
	return into;
}

/** Resolves one `&`-relative selector part against one already-resolved parent part. */
function resolvePart(parent, part) {
	if (part.includes('&')) {
		return part.replace(/&/g, parent || '');
	}
	return parent ? `${parent} ${part}` : part;
}

/** Splits a selector list on top-level commas only — commas inside `:not()`/`:is()` are not separators. */
function splitSelectorList(selector) {
	const parts = [];
	let depth = 0;
	let current = '';
	for (const char of selector) {
		if (char === '(' || char === '[') {
			depth++;
		} else if (char === ')' || char === ']') {
			depth = Math.max(0, depth - 1);
		}
		if (char === ',' && depth === 0) {
			parts.push(current);
			current = '';
			continue;
		}
		current += char;
	}
	parts.push(current);
	return parts.map((part) => part.trim()).filter(Boolean);
}

/** Resolves a comma-separated selector against a comma-separated parent, the way Sass does. */
function resolveSelector(parents, selector) {
	const parts = splitSelectorList(selector);
	const bases = parents.length > 0 ? parents : [''];
	const resolved = [];
	for (const base of bases) {
		for (const part of parts) {
			resolved.push(resolvePart(base, part).trim());
		}
	}
	return resolved;
}

/**
 * Matches a block carrier — the block class plus any modifiers, but never an element (`__…`).
 *
 * `kol-BLOCK` is the placeholder for a `$block-classname` parameter. A parameterised mixin only
 * styles a skeleton block if it addresses an interactive element at all, so the generic placeholder
 * is only treated as a carrier in files that mention one (see `mentionsInteractiveElement`).
 * Without that guard, mixins parameterised over unrelated blocks (a radio input, say) would be
 * reported.
 */
function carrierPattern(includeGeneric) {
	const blocks = includeGeneric ? [...WRAPPER_BLOCKS, 'kol-BLOCK'] : WRAPPER_BLOCKS;
	return new RegExp(`\\.(?:${blocks.join('|')})(?:--[a-zA-Z0-9-]+)*(?!__)(?![a-zA-Z0-9_-])`, 'g');
}

function mentionsInteractiveElement(source) {
	return /__button|__anchor|__#\{\$interactive-element\}|\$interactive-element/.test(source);
}

function findModifierGluedElement(selector, includeGeneric) {
	const blocks = includeGeneric ? [...WRAPPER_BLOCKS, 'kol-BLOCK'] : WRAPPER_BLOCKS;
	return new RegExp(`\\.(?:${blocks.join('|')})--[a-zA-Z0-9-]+__`).test(selector);
}

/**
 * Reads the rest of the compound selector attached to a carrier — every `:pseudo(…)`, `[attr]`,
 * `.class` and `#id` up to the next combinator or whitespace. `.kol-button:hover:not(:disabled)`
 * attaches `:hover:not(:disabled)`, so predicates are found wherever they sit in the chain, not
 * only directly after the carrier.
 */
function attachedCompound(rest) {
	let depth = 0;
	let end = 0;
	for (const char of rest) {
		if (char === '(' || char === '[') {
			depth++;
		} else if (char === ')' || char === ']') {
			depth = Math.max(0, depth - 1);
		} else if (depth === 0 && /[\s>+~,]/.test(char)) {
			break;
		}
		end++;
	}
	return rest.slice(0, end);
}

/** Splits an attached compound into its individual `:pseudo(…)` / `[attr]` / `.class` parts. */
function compoundParts(compound) {
	const parts = [];
	let current = '';
	let depth = 0;
	for (const char of compound) {
		if (char === '(' || char === '[') {
			depth++;
		} else if (char === ')' || char === ']') {
			depth = Math.max(0, depth - 1);
		}
		if (depth === 0 && (char === ':' || char === '.' || char === '[') && current && !current.endsWith(':')) {
			parts.push(current);
			current = char;
			continue;
		}
		current += char;
	}
	if (current) {
		parts.push(current);
	}
	return parts;
}

function findCarrierStatePredicate(selector, includeGeneric) {
	const pattern = carrierPattern(includeGeneric);
	let match;
	while ((match = pattern.exec(selector)) !== null) {
		const compound = attachedCompound(selector.slice(match.index + match[0].length));
		if (!compound) {
			continue;
		}
		for (const part of compoundParts(compound)) {
			for (const pseudo of INVERTING_ON_WRAPPER) {
				if (part.startsWith(pseudo)) {
					return { kind: 'inverting', pseudo, carrier: match[0] };
				}
			}
			// `:focus-within` is legitimate on the wrapper and must not be caught by `:focus`.
			if (part.startsWith(':focus-within')) {
				continue;
			}
			for (const pseudo of DEAD_ON_WRAPPER) {
				if (part.startsWith(pseudo)) {
					return { kind: 'dead', pseudo, carrier: match[0] };
				}
			}
		}
	}
	return null;
}

/**
 * Walks the block tree and yields every resolved selector.
 *
 * `@include name(...)` is expanded with the *current* selector context, so a mixin body is checked
 * where it is used, not only where it is declared. Mixin definitions themselves are walked once with
 * an empty context, which is what catches parameterised mixins such as `button($block-classname)`.
 */
function* walk(node, parents, mixins, expanding = new Set()) {
	for (const child of node.children ?? []) {
		if (child.statement !== undefined) {
			const include = /^@include\s+([\w-]+)/.exec(child.statement);
			if (include && mixins.has(include[1]) && !expanding.has(include[1])) {
				expanding.add(include[1]);
				yield* walk(mixins.get(include[1]), parents, mixins, expanding);
				expanding.delete(include[1]);
			}
			continue;
		}

		const header = child.header;
		if (!header) {
			continue;
		}

		if (header.startsWith('@mixin') || header.startsWith('@function')) {
			// Definitions are walked from the file root with an empty context (see below).
			continue;
		}
		if (header.startsWith('@include')) {
			const include = /^@include\s+([\w-]+)/.exec(header);
			if (include && mixins.has(include[1]) && !expanding.has(include[1])) {
				expanding.add(include[1]);
				yield* walk(mixins.get(include[1]), parents, mixins, expanding);
				expanding.delete(include[1]);
			}
			// A content block passed to a mixin keeps the surrounding selector context.
			yield* walk(child, parents, mixins, expanding);
			continue;
		}
		if (AT_RULE_PASSTHROUGH.test(header)) {
			// See SHAPE_SWITCH_VARIABLES.
			if (/^@(if|else)\b/.test(header) && SHAPE_SWITCH_VARIABLES.some((name) => header.includes(name))) {
				continue;
			}
			yield* walk(child, parents, mixins, expanding);
			continue;
		}
		if (AT_RULE_OPAQUE.test(header)) {
			continue;
		}
		if (header.startsWith('@at-root')) {
			const resolved = resolveSelector([], header.replace(/^@at-root\s*/, ''));
			for (const selector of resolved) {
				yield { selector, line: child.line };
			}
			yield* walk(child, resolved, mixins, expanding);
			continue;
		}
		if (header.startsWith('@')) {
			continue;
		}

		const resolved = resolveSelector(parents, header);
		for (const selector of resolved) {
			yield { selector, line: child.line };
		}
		yield* walk(child, resolved, mixins, expanding);
	}
}

function* allSelectors(source) {
	const root = parseBlocks(source);
	const mixins = collectMixins(root);
	yield* walk(root, [], mixins);
	// Mixin definitions are also checked standalone, with an empty context. That is how
	// `@mixin button($block-classname) { .#{$block-classname} { … } }` gets analysed even though it
	// is included from another file.
	for (const mixin of mixins.values()) {
		yield* walk(mixin, [], mixins, new Set());
	}
}

function checkFile(file) {
	const findings = [];
	const seen = new Set();
	const source = readFileSync(file, 'utf8');
	const includeGeneric = mentionsInteractiveElement(source);
	for (const { selector, line } of allSelectors(source)) {
		if (!selector || selector.includes('X')) {
			continue;
		}
		const key = `${line}|${selector}`;
		if (seen.has(key)) {
			continue;
		}
		seen.add(key);

		if (findModifierGluedElement(selector, includeGeneric)) {
			findings.push({
				file: relative(REPO_ROOT, file),
				line,
				selector,
				rule: 'modifier-glued-element',
				message:
					'A nested `&__element` inside a modifier block glues modifier and element into one ' +
					'class that exists nowhere. Use a plain descendant instead.',
			});
			continue;
		}

		const state = findCarrierStatePredicate(selector, includeGeneric);
		if (state) {
			findings.push({
				file: relative(REPO_ROOT, file),
				line,
				selector,
				rule: state.kind === 'inverting' ? 'inverting-predicate-on-carrier' : 'dead-predicate-on-carrier',
				message:
					state.kind === 'inverting'
						? `\`${state.pseudo}\` is always true on the wrapper \`${state.carrier}\`, so the rule inverts and ` +
							'applies to disabled elements. Scope it to the interactive element.'
						: `\`${state.pseudo}\` never matches the wrapper \`${state.carrier}\`, so the rule is dead. ` +
							'Scope it to the interactive element.',
			});
		}
	}
	return findings;
}

function main() {
	const asJson = process.argv.includes('--json');
	const files = SCAN_ROOTS.flatMap((root) => collectScssFiles(join(REPO_ROOT, root)));
	const findings = files.flatMap(checkFile);

	if (asJson) {
		console.log(JSON.stringify(findings, null, 2));
	} else if (findings.length === 0) {
		console.log(`✔ ${files.length} SCSS files checked, no skeleton selector problems found.`);
	} else {
		for (const finding of findings) {
			console.error(`${finding.file}:${finding.line}  [${finding.rule}]`);
			console.error(`    ${finding.selector}`);
			console.error(`    ${finding.message}\n`);
		}
		console.error(`✘ ${findings.length} problem(s) in ${files.length} SCSS files.`);
	}

	process.exit(findings.length === 0 ? 0 : 1);
}

main();
