import type { ThemeToken } from './extract-tokens.js';

/** DTCG token file: nested token tree with `$value`/`$type` leaves. */
export type DtcgFile = Record<string, unknown>;

/**
 * The Penpot token bundle: the multifile import format of the Penpot token
 * management (W3C DTCG tokens plus `$themes.json` and `$metadata.json`).
 * The same bundle imports into Figma through the Tokens Studio plugin.
 */
export interface PenpotTokenBundle {
	files: Record<string, string>;
}

const COLOR_PATTERN = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|light-dark\()/i;
const LENGTH_PATTERN = /^-?[\d.]+(rem|em|px|%)$/;

/**
 * Splits theme tokens into Penpot token sets.
 *
 * Scheme-neutral tokens (spacing, radii, fonts) go into `core`; every token that
 * resolves through `light-dark()` lands in both `light` and `dark` with identical
 * names, so the theme switch is a set switch. Penpot themes reference the sets:
 * within the group `Scheme` exactly one of Light/Dark is active.
 */
export function buildTokenSets(tokens: ThemeToken[]): { core: DtcgFile; light: DtcgFile; dark: DtcgFile } {
	const core: DtcgFile = {};
	const light: DtcgFile = {};
	const dark: DtcgFile = {};
	for (const token of tokens) {
		if (token.light !== undefined && token.dark !== undefined) {
			setToken(light, token.name, token.light);
			setToken(dark, token.name, token.dark);
		} else {
			setToken(core, token.name, token.value);
		}
	}
	return { core, light, dark };
}

/**
 * Assembles the importable bundle: token set files, `$themes.json` with the
 * Light/Dark theme group and `$metadata.json` with the set order.
 */
export function buildPenpotBundle(tokens: ThemeToken[], themeName: string): PenpotTokenBundle {
	const sets = buildTokenSets(tokens);
	const themes = [
		{ name: 'Light', group: 'Scheme', selectedTokenSets: { core: 'enabled', light: 'enabled' } },
		{ name: 'Dark', group: 'Scheme', selectedTokenSets: { core: 'enabled', dark: 'enabled' } },
	];
	return {
		files: {
			'core.json': JSON.stringify(sets.core, null, '\t'),
			'light.json': JSON.stringify(sets.light, null, '\t'),
			'dark.json': JSON.stringify(sets.dark, null, '\t'),
			'$themes.json': JSON.stringify(themes, null, '\t'),
			'$metadata.json': JSON.stringify({ tokenSetOrder: ['core', 'light', 'dark'], themeName }, null, '\t'),
		},
	};
}

/**
 * Maps a custom property name onto a DTCG path with one group level
 * (`--color-primary-variant` becomes `color > primary-variant`). Collisions
 * between a group and a token of the same name fail loudly instead of
 * silently overwriting part of the tree.
 */
function setToken(file: DtcgFile, name: string, value: string): void {
	const segments = name.replace(/^--/, '').split('-');
	const group = segments[0];
	const leaf = segments.length === 1 ? '$value' : segments.slice(1).join('-');
	if (typeof file[group] === 'undefined') {
		file[group] = {};
	}
	const node = file[group] as DtcgFile;
	if (typeof node !== 'object' || node === null || '$value' in node) {
		throw new Error(`Token name collision at ${name}: ${group} is already a token.`);
	}
	if (leaf === '$value') {
		file[group] = { $type: inferType(value), $value: value };
		return;
	}
	node[leaf] = { $type: inferType(value), $value: value };
}

function inferType(value: string): string {
	return COLOR_PATTERN.test(value) ? 'color' : LENGTH_PATTERN.test(value) ? 'dimension' : 'other';
}
