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
	return tokens;
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
	const match = value.match(/^var\(--[\w-]+,\s*(.+)\)$/s);
	return match ? match[1].trim() : value;
}
