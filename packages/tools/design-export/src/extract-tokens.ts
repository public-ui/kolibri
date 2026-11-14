import type { ThemeStyles } from './types.js';

/**
 * A theme token as extracted from the compiled `kol-theme-global` layer.
 *
 * `light` and `dark` are only set when the source resolves through CSS `light-dark()`;
 * tokens without a scheme pair carry their single computed `value` instead
 * (for example spacing or font tokens).
 */
export interface ThemeToken {
	name: string;
	value: string;
	light?: string;
	dark?: string;
}

const CUSTOM_PROPERTY_PATTERN = /(--[\w-]+)\s*:\s*([^;]+);/g;
const LIGHT_DARK_PATTERN = /light-dark\(([^,()]+),\s*([^()]+)\)/;

/**
 * Extracts every `:host` custom property of the compiled global theme CSS into a token list.
 *
 * The compiled CSS resolves Sass interpolation and `rem()` calls, so the values are real
 * CSS values. The outer `var(--kolibri-*, …)` fallback wrapper is stripped: the token
 * name is the internal chain link (`--color-primary`), the value is what the theme
 * actually paints when no host page overrides `--kolibri-color-primary`.
 *
 * Internal references (`var(--color-light)` without fallback) are resolved to the
 * referenced token's value, so every exported token is self-contained — design tools
 * would report the raw `var()` string as a missing reference.
 */
export function extractTokens(globalCss: string): ThemeToken[] {
	const tokens: ThemeToken[] = [];
	for (const [, name, rawValue] of globalCss.matchAll(CUSTOM_PROPERTY_PATTERN)) {
		const value = unwrapVarFallback(rawValue.trim());
		const match = value.match(LIGHT_DARK_PATTERN);
		const token: ThemeToken = match
			? {
					name,
					value,
					light: match[1].trim(),
					dark: match[2].trim(),
				}
			: { name, value };
		tokens.push(token);
	}
	resolveReferences(tokens);
	return tokens;
}

function resolveReferences(tokens: ThemeToken[]): void {
	const byName = new Map(tokens.map((token) => [token.name, token]));
	const resolve = (value: string, seen: Set<string>): string => {
		const match = value.match(/^var\((--[\w-]+)\)$/);
		if (!match) {
			return value;
		}
		const target = byName.get(match[1]);
		if (!target || seen.has(target.name)) {
			return value;
		}
		seen.add(target.name);
		return resolve(target.value, seen);
	};
	for (const token of tokens) {
		const seen = new Set([token.name]);
		token.value = resolve(token.value, seen);
		const light = token.light === undefined ? undefined : resolve(token.light, new Set([token.name]));
		const dark = token.dark === undefined ? undefined : resolve(token.dark, new Set([token.name]));
		if (light !== undefined && dark !== undefined) {
			token.light = light;
			token.dark = dark;
		}
		const resolvedPair = token.value.match(LIGHT_DARK_PATTERN);
		if (resolvedPair) {
			token.light = resolvedPair[1].trim();
			token.dark = resolvedPair[2].trim();
		}
	}
}

/**
 * Loads the compiled style map of a theme package such as `@public-ui/theme-default`.
 *
 * A KoliBri theme export is the patch function returned by `KoliBri.createTheme`. Calling
 * it with a plain collector bypasses the global theme store, so extraction works in Node
 * without a DOM. Only the `GLOBAL` layer is needed for tokens.
 */
export async function loadThemeStyles(themeModule: string): Promise<ThemeStyles> {
	const theme = (await import(themeModule)) as { DEFAULT: (patch: (name: string, styles: Record<string, string>, features?: unknown) => unknown) => unknown };
	const collected = theme.DEFAULT((name, styles) => ({ name, styles })) as { name: string; styles: Record<string, string> };
	if (typeof collected?.name !== 'string' || typeof collected?.styles?.GLOBAL !== 'string') {
		throw new Error(`Theme module ${themeModule} does not expose a KoliBri theme via DEFAULT.`);
	}
	return {
		name: collected.name,
		globalCss: collected.styles.GLOBAL,
		componentCss: Object.fromEntries(
			Object.entries(collected.styles)
				.filter(([key]) => key !== 'GLOBAL' && key !== 'PROPERTIES')
				.map(([key, css]) => [key.toLowerCase(), css]),
		),
	};
}

function unwrapVarFallback(value: string): string {
	const match = value.match(/^var\(\s*--[\w-]+\s*,\s*(.+)\)\s*$/s);
	return match ? match[1].trim() : value;
}
