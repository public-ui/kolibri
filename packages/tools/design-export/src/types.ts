import type { ThemeToken } from './extract-tokens.js';

/** Compiled style map of a theme package (`GLOBAL` plus one entry per component tag). */
export interface ThemeStyles {
	name: string;
	globalCss: string;
	componentCss: Record<string, string>;
}

/** API facet of one component, extracted from `custom-elements.json`. */
export interface ComponentApi {
	tag: string;
	attributes: string[];
	events: string[];
	slots: { name: string; description?: string }[];
}

/** BEM facet from the central BEM registry (`bem-registry.ts`). */
export interface ComponentBem {
	block: string;
	elements: string[];
	modifiers: string[];
}

/**
 * Tool-neutral intermediate representation (IR), schema version 1.
 *
 * The IR carries no color values, only token references; every target adapter
 * (Penpot, Figma) derives its own files from it.
 */
export interface IntermediateRepresentation {
	schema: '1.0';
	generatedAt: string;
	sources: {
		components: string;
		theme: string;
		themeName: string;
	};
	tokens: ThemeToken[];
	components: {
		api: ComponentApi;
		bem?: ComponentBem;
		dom?: DomNode;
		states: string[];
		svg: { scheme: 'light' | 'dark'; state: string; file: string }[];
	}[];
}

/** Flattened rendered DOM of a component (shadow roots included), names follow BEM. */
export interface DomNode {
	name: string;
	tag: string;
	children: DomNode[];
	text?: string;
}
