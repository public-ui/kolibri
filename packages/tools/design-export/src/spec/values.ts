import type { ThemeToken } from '../extract-tokens.js';
import type { ComputedStyle } from './cascade.js';
import { splitValue } from './cascade.js';

/** A resolved CSS value: the light value, the dark value where it differs, and the theme token it comes from. */
export interface ResolvedValue {
	value: string;
	dark?: string;
	token?: string;
}

const ROOT_FONT_SIZE = 16;
const VAR_PATTERN = /var\(\s*(--[\w-]+)\s*(?:,([^()]*(?:\([^()]*(?:\([^()]*\)[^()]*)*\)[^()]*)*))?\)/;

/**
 * Follows `var()` references through the computed custom properties of a node. A value that is a
 * single reference to a theme token stops at the token, so the design tool binds the token instead
 * of copying its color. `light-dark()` splits into the light and the dark value.
 */
export function resolveValue(raw: string | undefined, style: ComputedStyle, tokens: Map<string, ThemeToken>): ResolvedValue | undefined {
	if (raw === undefined) return undefined;
	let value = raw.trim();
	for (let step = 0; step < 32; step++) {
		const single = /^var\(\s*(--[\w-]+)\s*(?:,.*)?\)$/.exec(value);
		if (single && tokens.has(single[1]) && style[single[1]] !== undefined && isTokenDeclaration(style[single[1]], tokens.get(single[1]))) {
			const token = tokens.get(single[1]) as ThemeToken;
			return { value: token.light ?? token.value, ...(token.dark !== undefined ? { dark: token.dark } : {}), token: token.name };
		}
		const match = VAR_PATTERN.exec(value);
		if (!match) break;
		const replacement = style[match[1]] ?? match[2]?.trim() ?? '';
		value = `${value.slice(0, match.index)}${replacement}${value.slice(match.index + match[0].length)}`.trim();
	}
	const lightDark = /^light-dark\((.+)\)$/.exec(value);
	if (lightDark) {
		const [light, dark] = splitValue(lightDark[1], /,/).map((part) => part.trim());
		return { value: light, dark };
	}
	return { value };
}

/**
 * A custom property still holds the theme's own declaration when its value is the one of the
 * token (the `--kolibri-*` fallback chain of the global layer) and was not overridden by a
 * component rule with an unrelated value.
 */
function isTokenDeclaration(declared: string, token: ThemeToken | undefined): boolean {
	return token !== undefined && (declared.includes('--kolibri-') || declared.includes(token.value) || /^var\(--[\w-]+\)$/.test(declared.trim()));
}

/**
 * Converts a length to px: `px`, `rem`, `em`, unitless `0`, and `calc()`, `min()`, `max()` over
 * them. Returns `undefined` for anything that needs layout (percentages, viewport units).
 */
export function toPx(value: string | undefined, fontSize: number): number | undefined {
	if (value === undefined) return undefined;
	const text = value.trim();
	if (text === '0') return 0;
	const unit = /^(-?[\d.]+)(px|rem|em)$/.exec(text);
	if (unit) {
		const amount = Number(unit[1]);
		return round(unit[2] === 'px' ? amount : unit[2] === 'rem' ? amount * ROOT_FONT_SIZE : amount * fontSize);
	}
	if (/^-?[\d.]+$/.test(text)) return Number(text);
	const fn = /^(calc|max|min)\((.*)\)$/.exec(text);
	if (!fn) return undefined;
	if (fn[1] === 'calc') return evaluate(fn[2], fontSize);
	const args = splitValue(fn[2], /,/).map((part) => toPx(part.trim(), fontSize));
	if (args.some((arg) => arg === undefined)) return undefined;
	return fn[1] === 'max' ? Math.max(...(args as number[])) : Math.min(...(args as number[]));
}

/** Evaluates a `calc()` body of lengths and numbers with `+ - * /` and parentheses. */
function evaluate(expression: string, fontSize: number): number | undefined {
	const tokens = expression.match(/\(|\)|[*/+]|-(?=\s)|-?[\d.]+(?:px|rem|em)?|[a-z]+\([^()]*\)/g);
	if (!tokens) return undefined;
	let position = 0;
	const primary = (): number | undefined => {
		const token = tokens[position++];
		if (token === '(') {
			const inner = sum();
			position++;
			return inner;
		}
		return toPx(token, fontSize);
	};
	const product = (): number | undefined => {
		let left = primary();
		while (tokens[position] === '*' || tokens[position] === '/') {
			const operator = tokens[position++];
			const right = primary();
			if (left === undefined || right === undefined) return undefined;
			left = operator === '*' ? left * right : left / right;
		}
		return left;
	};
	const sum = (): number | undefined => {
		let left = product();
		while (tokens[position] === '+' || tokens[position] === '-') {
			const operator = tokens[position++];
			const right = product();
			if (left === undefined || right === undefined) return undefined;
			left = operator === '+' ? left + right : left - right;
		}
		return left;
	};
	const result = sum();
	return result === undefined ? undefined : round(result);
}

export function round(value: number): number {
	return Math.round(value * 100) / 100;
}

/** Whether a resolved color paints anything. */
export function isPainted(color: string | undefined): boolean {
	if (!color) return false;
	const value = color.replace(/\s/g, '').toLowerCase();
	return !['', 'none', 'transparent', 'initial', 'unset', 'currentcolor'].includes(value) && !/^rgba\([^)]*,0\)$/.test(value);
}
