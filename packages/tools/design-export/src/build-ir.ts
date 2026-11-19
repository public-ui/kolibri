import type { ThemeToken } from './extract-tokens.js';
import type { ComponentApi, ComponentBem, DomNode, IntermediateRepresentation } from './types.js';

export interface IrInput {
	componentsVersion: string;
	themeVersion: string;
	themeName: string;
	tokens: ThemeToken[];
	apis: ComponentApi[];
	bems: ComponentBem[];
	doms: Record<string, DomNode>;
	states: Record<string, string[]>;
	svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]>;
}

/**
 * Merges the three IR sources (API metadata, BEM registry, rendered DOM) plus the
 * theme tokens into the versioned intermediate representation. SVG export file
 * references are attached per component and scheme, so the IR is the complete
 * build plan of a design library.
 */
export function buildIr(input: IrInput): IntermediateRepresentation {
	const bemByTag = new Map(input.bems.map((bem) => [bem.block, bem]));
	return {
		schema: '1.0',
		generatedAt: new Date().toISOString(),
		sources: {
			components: input.componentsVersion,
			theme: input.themeVersion,
			themeName: input.themeName,
		},
		tokens: input.tokens,
		components: input.apis.map((api) => ({
			api,
			bem: bemByTag.get(api.tag),
			dom: input.doms[api.tag],
			states: input.states[api.tag] ?? ['default'],
			svg: input.svgs[api.tag] ?? [],
		})),
	};
}
