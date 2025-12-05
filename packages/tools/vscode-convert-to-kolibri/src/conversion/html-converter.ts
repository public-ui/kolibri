import { ConversionCandidate, ConversionOutput, ScanSummary } from './types';

interface AttributeMap {
	[key: string]: string | boolean;
}

const buttonPattern = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
const labelledInputPattern = /<label[^>]*>([^<]*)<\/label>\s*<input([^>]*)>/gi;
const inputPattern = /<input([^>]*)>/gi;
const anchorPattern = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
const selectPattern = /<select\b([^>]*)>([\s\S]*?)<\/select>/gi;

const variantClasses: Record<string, string> = {
	primary: 'primary',
	secondary: 'secondary',
	success: 'success',
	danger: 'danger',
	warning: 'warning',
};

const selectVariants = ['outline', 'ghost', 'solid'];

function parseAttributes(text: string): AttributeMap {
	const attributes: AttributeMap = {};
	const regex = /(\w[\w-]*)(?:=("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(text)) !== null) {
		const [, key, , doubleQuoted, singleQuoted, bare] = match;
		attributes[key] = doubleQuoted ?? singleQuoted ?? bare ?? true;
	}

	return attributes;
}

function extractLabel(content: string): string {
	const withoutTags = content
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return withoutTags || 'Label';
}

function extractIcon(content: string): string | undefined {
	const iconMatch = /<i[^>]*class=(?:"([^"]*)"|'([^']*)')/i.exec(content);
	if (!iconMatch) {
		return undefined;
	}

	const iconClass = iconMatch[1] ?? iconMatch[2];
	if (!iconClass) {
		return undefined;
	}

	const classes = iconClass.split(/\s+/);
	return classes.find((item) => item.startsWith('fa-'));
}

function mapVariant(classValue?: string | boolean): string | undefined {
	if (!classValue || typeof classValue !== 'string') {
		return undefined;
	}

	const classes = classValue.split(/\s+/).filter(Boolean);
	const match = classes.find((item) => variantClasses[item]);
	return match ? variantClasses[match] : undefined;
}

function mapSelectVariant(classValue?: string | boolean): string | undefined {
	if (!classValue || typeof classValue !== 'string') {
		return undefined;
	}

	const classes = classValue.split(/\s+/).filter(Boolean);
	return classes.find((item) => selectVariants.includes(item));
}

function normalizeBoolean(value: string | boolean | undefined): boolean {
	if (value === undefined) {
		return false;
	}

	if (typeof value === 'boolean') {
		return value;
	}

	return value === '' || value.toLowerCase() === 'true';
}

function convertButtonMatch(_: string, attributeText: string, content: string): ConversionCandidate {
	const attributes = parseAttributes(attributeText);
	const label = extractLabel(content);
	const variant = mapVariant(attributes.class ?? attributes.className);
	const icon = extractIcon(content);
	const disabled = normalizeBoolean(attributes.disabled);

	let replacement = `<kol-button _label="${label}"`;
	if (variant) {
		replacement += ` _variant="${variant}"`;
	}
	if (icon) {
		replacement += ` _icon="${icon}"`;
	}
	if (disabled) {
		replacement += ' _disabled="true"';
	}
	replacement += '></kol-button>';

	const warnings: string[] = [];
	if (!icon && /<i/i.test(content)) {
		warnings.push('Icon detected but could not be mapped');
	}

	return {
		kind: 'button',
		confidence: label ? 'high' : 'medium',
		original: content,
		replacement,
		reason: variant ? 'Mapped button variant from class name' : 'Defaulted to standard kol-button',
		warnings: warnings.length ? warnings : undefined,
	};
}

function convertLabelledInputMatch(_: string, labelContent: string, attributeText: string): ConversionCandidate {
	const attributes = parseAttributes(attributeText);
	const label = extractLabel(labelContent);
	const type = typeof attributes.type === 'string' ? attributes.type : 'text';
	const hint = typeof attributes.placeholder === 'string' ? attributes.placeholder : undefined;
	const required = normalizeBoolean(attributes.required);
	const replacementParts = [`<kol-input-${type} _label="${label}"`];

	if (type !== 'text') {
		replacementParts.push(` _type="${type}"`);
	}
	if (hint) {
		replacementParts.push(` _hint="${hint}"`);
	}
	if (required) {
		replacementParts.push(' _required="true"');
	}

	replacementParts.push(' />');

	return {
		kind: 'input',
		confidence: 'high',
		original: `<label>${label}</label><input ... />`,
		replacement: replacementParts.join(''),
		reason: 'Mapped label and validation hints from HTML pair',
	};
}

function convertInputMatch(_: string, attributeText: string): ConversionCandidate {
	const attributes = parseAttributes(attributeText);
	const type = typeof attributes.type === 'string' ? attributes.type : 'text';
	const label =
		(typeof attributes['aria-label'] === 'string' && attributes['aria-label']) ||
		(typeof attributes.placeholder === 'string' && attributes.placeholder) ||
		(type !== 'text' ? `${type} input` : 'Input');
	const hint = typeof attributes.placeholder === 'string' ? attributes.placeholder : undefined;
	const required = normalizeBoolean(attributes.required);
	const replacementParts = [`<kol-input-${type} _label="${label}"`];

	if (type !== 'text') {
		replacementParts.push(` _type="${type}"`);
	}
	if (hint) {
		replacementParts.push(` _hint="${hint}"`);
	}
	if (required) {
		replacementParts.push(' _required="true"');
	}

	replacementParts.push(' />');

	const warnings: string[] = [];
	if (!attributes.placeholder && !attributes['aria-label']) {
		warnings.push('No explicit label found; placeholder was used as label');
	}

	return {
		kind: 'input',
		confidence: warnings.length ? 'medium' : 'high',
		original: `<input ${attributeText.trim()}/>`,
		replacement: replacementParts.join(''),
		reason: 'Mapped input attributes to kol-input props',
		warnings: warnings.length ? warnings : undefined,
	};
}

function convertAnchorMatch(_: string, attributeText: string, content: string): ConversionCandidate {
	const attributes = parseAttributes(attributeText);
	const href = typeof attributes.href === 'string' ? attributes.href : '#';
	const label = extractLabel(content);
	const replacement = `<kol-link _href="${href}" _label="${label}"></kol-link>`;

	return {
		kind: 'link',
		confidence: 'high',
		original: content,
		replacement,
		reason: 'Anchor converted to kol-link',
	};
}

function convertSelectMatch(_: string, attributeText: string, content: string): ConversionCandidate {
	const attributes = parseAttributes(attributeText);
	const variant = mapSelectVariant(attributes.class ?? attributes.className);
	let replacement = '<kol-select';

	if (variant) {
		replacement += ` _variant="${variant}"`;
	}

	replacement += `>${content}</kol-select>`;

	return {
		kind: 'select',
		confidence: 'medium',
		original: content,
		replacement,
		reason: 'Select converted to kol-select',
		warnings: variant ? undefined : ['Select variant unknown; default styles applied'],
	};
}

function applyPattern(source: string, pattern: RegExp, handler: (...args: string[]) => ConversionCandidate): ConversionOutput {
	const candidates: ConversionCandidate[] = [];
	pattern.lastIndex = 0;
	const text = source.replace(pattern, (...args) => {
		const candidate = handler(...args);
		candidates.push(candidate);
		return candidate.replacement;
	});

	return { text, candidates };
}

export function convertHtml(source: string): ConversionOutput {
	const aggregatedCandidates: ConversionCandidate[] = [];
	let output = source;

	const buttonResult = applyPattern(output, buttonPattern, convertButtonMatch);
	output = buttonResult.text;
	aggregatedCandidates.push(...buttonResult.candidates);

	const labelledInputResult = applyPattern(output, labelledInputPattern, convertLabelledInputMatch);
	output = labelledInputResult.text;
	aggregatedCandidates.push(...labelledInputResult.candidates);

	const inputResult = applyPattern(output, inputPattern, convertInputMatch);
	output = inputResult.text;
	aggregatedCandidates.push(...inputResult.candidates);

	const anchorResult = applyPattern(output, anchorPattern, convertAnchorMatch);
	output = anchorResult.text;
	aggregatedCandidates.push(...anchorResult.candidates);

	const selectResult = applyPattern(output, selectPattern, convertSelectMatch);
	output = selectResult.text;
	aggregatedCandidates.push(...selectResult.candidates);

	return { text: output, candidates: aggregatedCandidates };
}

export function scanHtml(source: string): ScanSummary {
	const candidates: ConversionCandidate[] = [];

	const apply = (pattern: RegExp, handler: (...args: string[]) => ConversionCandidate): void => {
		pattern.lastIndex = 0;
		let match: RegExpExecArray | null;
		while ((match = pattern.exec(source)) !== null) {
			const candidate = handler(...(match as unknown as string[]));
			candidates.push(candidate);
		}
	};

	apply(buttonPattern, convertButtonMatch);
	apply(labelledInputPattern, convertLabelledInputMatch);
	apply(inputPattern, convertInputMatch);
	apply(anchorPattern, convertAnchorMatch);
	apply(selectPattern, convertSelectMatch);

	const counts = candidates.reduce<Record<string, number>>((accumulator, item) => {
		accumulator[item.kind] = (accumulator[item.kind] ?? 0) + 1;
		return accumulator;
	}, {});

	return { counts, candidates };
}
