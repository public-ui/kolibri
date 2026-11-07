import { penpotTokenName } from './dtcg.js';
import type { ThemeToken } from './extract-tokens.js';
import type { ShapeNode } from './render/dom-to-shapes.js';

export interface TokenBinding {
	/** Colors without a matching token; they stay plain values and do not follow the scheme. */
	unbound: string[];
	/** Colors several tokens match; the first one in theme order is bound. */
	ambiguous: string[];
}

/** Normalizes a CSS color (`#rgb`, `#rrggbb`, `rgb()`, `rgba()`) to lowercase `#rrggbb`, alpha dropped. */
export function toHex(color: string | undefined): string | undefined {
	if (!color) {
		return undefined;
	}
	const value = color.trim().toLowerCase();
	const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(value);
	if (short) {
		return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
	}
	if (/^#[0-9a-f]{6}/.test(value)) {
		return value.slice(0, 7);
	}
	const rgb = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(value);
	return rgb
		? `#${rgb
				.slice(1, 4)
				.map((channel) => Number(channel).toString(16).padStart(2, '0'))
				.join('')}`
		: undefined;
}

/**
 * Binds every color of a shape tree to the theme token it comes from. A color is identified by
 * the pair of values the same layer has in the light and the dark rendering: a light/dark token
 * matches both, a scheme-neutral token matches when both renderings show its value. The pair
 * tells tokens apart that share their light value. Without a dark rendering, or where the two
 * trees differ in structure, the light value alone decides.
 */
export function bindTokens(
	light: ShapeNode,
	dark: ShapeNode | undefined,
	tokens: ThemeToken[],
	binding: TokenBinding = { ambiguous: [], unbound: [] },
): TokenBinding {
	const candidates = tokens
		.map((token) => ({ name: penpotTokenName(token.name), light: toHex(token.light ?? token.value), dark: toHex(token.dark ?? token.value) }))
		.filter((token) => token.light !== undefined);

	function tokenFor(lightColor: string | undefined, darkColor: string | undefined, where: string): string | undefined {
		const lightHex = toHex(lightColor);
		if (lightHex === undefined) {
			return undefined;
		}
		const darkHex = toHex(darkColor);
		const matches = candidates.filter((token) => token.light === lightHex && (darkHex === undefined || token.dark === darkHex));
		if (matches.length === 0) {
			binding.unbound.push(`${where} ${lightHex}${darkHex ? `/${darkHex}` : ''}`);
			return undefined;
		}
		if (matches.length > 1) {
			binding.ambiguous.push(`${where} ${lightHex}: ${matches.map((token) => token.name).join(', ')}`);
		}
		return matches[0].name;
	}

	function walk(node: ShapeNode, counterpart: ShapeNode | undefined): void {
		const twin = counterpart && counterpart.name === node.name && counterpart.kind === node.kind ? counterpart : undefined;
		node.fillToken = tokenFor(node.fill, twin?.fill, `${node.name} Fläche`);
		node.strokeToken = tokenFor(node.stroke, twin?.stroke, `${node.name} Rahmen`);
		if (node.outline) {
			node.outline.token = tokenFor(node.outline.color, twin?.outline?.color, `${node.name} Fokusring`);
		}
		const sameStructure = twin !== undefined && twin.children.length === node.children.length;
		node.children.forEach((child, index) => walk(child, sameStructure ? twin.children[index] : undefined));
	}

	walk(light, dark);
	return binding;
}
