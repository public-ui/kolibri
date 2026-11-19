import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** An icon as vector paths in its own coordinate box (`viewBox`), y pointing down as in SVG. */
export interface IconVector {
	viewBox: string;
	paths: string[];
}

const COMMAND = /([ACHLMQSTVZ])([^ACHLMQSTVZ]*)/gi;

/**
 * The KoliBri icons (`kolicon-<name>`) from the SVG font that `@public-ui/components` ships in
 * `assets/kolicons`. A font glyph points y up from the baseline; the paths come out flipped into
 * SVG coordinates, so both design tools draw them as vector shapes without the font.
 */
export function loadIcons(componentsRoot: string): Map<string, IconVector> {
	const file = join(componentsRoot, 'assets', 'kolicons', 'kolicons.svg');
	if (!existsSync(file)) throw new Error(`${file} is missing: build @public-ui/icons and @public-ui/components first.`);
	const font = readFileSync(file, 'utf-8');
	const unitsPerEm = Number(/units-per-em="([\d.]+)"/.exec(font)?.[1] ?? 1000);
	const ascent = Number(/ascent="([\d.]+)"/.exec(font)?.[1] ?? unitsPerEm);
	const icons = new Map<string, IconVector>();
	for (const glyph of font.matchAll(/<glyph\b([^>]*)\/?>/g)) {
		const name = /glyph-name="([^"]+)"/.exec(glyph[1])?.[1];
		const d = /\sd="([^"]+)"/.exec(glyph[1])?.[1];
		if (!name || !d) continue;
		icons.set(`kolicon-${name}`, { viewBox: `0 0 ${unitsPerEm} ${unitsPerEm}`, paths: [flipPath(d, ascent, name)] });
	}
	return icons;
}

/** Mirrors absolute path data at the baseline: y becomes `ascent - y`. */
function flipPath(d: string, ascent: number, name: string): string {
	const parts: string[] = [];
	for (const [, command, args] of d.matchAll(COMMAND)) {
		if (command !== command.toUpperCase() || command === 'A') throw new Error(`kolicon-${name}: path command ${command} is not supported`);
		const numbers = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []).map(Number);
		const flipped =
			command === 'H' || command === 'Z'
				? numbers
				: command === 'V'
					? numbers.map((y) => ascent - y)
					: numbers.map((value, index) => (index % 2 === 1 ? ascent - value : value));
		parts.push(`${command}${flipped.map(round).join(' ')}`);
	}
	return parts.join('');
}

function round(value: number): number {
	return Math.round(value * 100) / 100;
}
