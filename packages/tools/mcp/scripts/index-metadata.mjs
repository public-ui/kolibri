/**
 * Derives the searchable `description` and `tags` of a sample index entry from its source.
 * Both fields are weighted by the fuzzy search (see `src/search.ts`), so general search terms
 * also match entries whose id and name do not contain them.
 */

const MAX_DESCRIPTION_LENGTH = 300;

function normalizeWhitespace(text) {
	return text.replace(/\s+/g, ' ').trim();
}

function truncate(text, maxLength = MAX_DESCRIPTION_LENGTH) {
	if (text.length <= maxLength) {
		return text;
	}
	const cut = text.slice(0, maxLength);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`;
}

function decodeEntities(text) {
	return text
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&amp;/g, '&');
}

/**
 * Returns the plain text of the first `<SampleDescription>` block of a React sample.
 */
export function extractSampleDescription(code) {
	if (typeof code !== 'string') {
		return undefined;
	}
	const match = code.match(/<SampleDescription(?:\s[^>]*)?>([\s\S]*?)<\/SampleDescription>/);
	if (!match) {
		return undefined;
	}
	const text = normalizeWhitespace(
		decodeEntities(
			match[1]
				// String literals in JSX expressions, e.g. {' '} or {'text'}, keep their content.
				.replace(/\{\s*(['"`])([^'"`]*)\1\s*\}/g, '$2')
				.replace(/\{[^{}]*\}/g, ' ')
				.replace(/<[^>]+>/g, ' '),
		),
	).replace(/\s+([,.;:!?)])/g, '$1');
	return text ? truncate(text) : undefined;
}

/**
 * Returns the `description` of a YAML front matter or, without one, the first prose paragraph of a Markdown document.
 */
export function extractMarkdownDescription(code) {
	if (typeof code !== 'string') {
		return undefined;
	}
	let content = code.replace(/\r\n?/g, '\n');

	const frontMatter = content.match(/^---\n([\s\S]*?)\n---\n/);
	if (frontMatter) {
		const description = frontMatter[1].match(/^description:\s*(.+)$/m);
		if (description) {
			const value = normalizeWhitespace(description[1].replace(/^(['"])(.*)\1$/, '$2'));
			if (value) {
				return truncate(value);
			}
		}
		content = content.slice(frontMatter[0].length);
	}

	content = content.replace(/<!--[\s\S]*?-->/g, '').replace(/^(```|~~~)[\s\S]*?^\1/gm, '');

	for (const block of content.split(/\n\s*\n/)) {
		const lines = block
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
		if (lines.length === 0) {
			continue;
		}
		const first = lines[0];
		// Headings, tables, quotes, lists, images, badges, HTML blocks and rules are no prose.
		if (/^(#|\||>|[-*+]\s|\d+\.\s|!\[|\[!\[|<|---|\*\*\*|===)/.test(first)) {
			continue;
		}
		const text = normalizeWhitespace(
			lines
				.join(' ')
				.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
				.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
				.replace(/(\*\*|__)(.+?)\1/g, '$2')
				.replace(/`([^`]+)`/g, '$1'),
		);
		if (text.length >= 20) {
			return truncate(text);
		}
	}
	return undefined;
}

function toKebabCase(name) {
	return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Returns the `kol-*` tag names of all KoliBri components a source uses, either as React adapter (`KolButton`) or as custom element (`<kol-button>`).
 */
export function extractComponentTags(code) {
	if (typeof code !== 'string') {
		return [];
	}
	const tags = new Set();
	for (const match of code.matchAll(/<\s*(Kol[A-Z][A-Za-z0-9]*)\b/g)) {
		tags.add(toKebabCase(match[1]));
	}
	for (const match of code.matchAll(/<\s*(kol-[a-z0-9-]+)\b/g)) {
		tags.add(match[1]);
	}
	return [...tags].sort();
}
