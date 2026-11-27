import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

/**
 * How a prop of a web component appears in the design tool, written as JSDoc tag `@design` at the
 * `@Prop`:
 *
 * - `@design variant`: a variant property; the values come from the prop type.
 * - `@design variant <label>=<value> …`: a variant property with these values, for a prop whose
 *   type has no enumerable values (`_color`).
 * - `@design toggle <text>`: a boolean variant property; `true` sets the prop to the text.
 * - `@design content <text>`: every variant shows the text.
 * - `@design sample <value>`: every variant sets the prop to the value (JSON, else a string).
 * - `@design state <value>`: a value of the variant property `State`; it sets the boolean prop to
 *   `true`. All state props of a component share the one property, beside the value `default`.
 *
 * A prop without the tag stays unset. At the component class, `@design slot <text>` fills the
 * default slot with the text, as slotted light DOM content does in the browser.
 */
export type DesignAnnotation =
	| { kind: 'content'; text: string }
	| { kind: 'sample'; value: unknown }
	| { kind: 'state'; value: string }
	| { kind: 'toggle'; text: string }
	| { kind: 'variant'; values?: [string, string][] };

export interface WebComponentSource {
	tag: string;
	file: string;
	/** Name of the exported component class (`KolBadge`). */
	className: string;
	/** Annotations per prop (`_level`). */
	annotations: Record<string, DesignAnnotation>;
	/** Literal defaults of the props (`_level = 0`). */
	defaults: Record<string, boolean | number | string>;
	/** Text in the default slot (`@design slot` at the class). */
	slot?: string;
}

/**
 * Reads the `@design` tags of the props of a web component. Returns `undefined` without a
 * component file or without any `@design` tag: such a component stays on the BEM path.
 */
export function readWebComponent(componentsRoot: string, tag: string): WebComponentSource | undefined {
	const file = join(componentsRoot, 'src', 'components', tag.replace(/^kol-/, ''), 'component.tsx');
	if (!existsSync(file)) return undefined;
	const source = ts.createSourceFile(file, readFileSync(file, 'utf-8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const declaration = source.statements.find(
		(statement): statement is ts.ClassDeclaration =>
			ts.isClassDeclaration(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true,
	);
	if (!declaration?.name) return undefined;
	const annotations: Record<string, DesignAnnotation> = {};
	const defaults: Record<string, boolean | number | string> = {};
	for (const member of declaration.members) {
		if (!ts.isPropertyDeclaration(member) || !hasDecorator(member, 'Prop')) continue;
		const name = member.name.getText(source);
		const fallback = member.initializer ? literalOf(member.initializer) : undefined;
		if (fallback !== undefined) defaults[name] = fallback;
		const annotation = readAnnotation(member);
		if (annotation) annotations[name] = annotation;
	}
	const slotTag = ts.getJSDocTags(declaration).find((entry) => entry.tagName.text === 'design');
	const slotText = slotTag ? commentOf(slotTag) : '';
	const slot = /^slot\s+/.test(slotText) ? slotText.replace(/^slot\s+/, '') : undefined;
	if (slotTag && slot === undefined) throw new Error(`Unknown @design tag "${slotText}" at ${declaration.name.text}`);
	if (Object.keys(annotations).length === 0 && slot === undefined) return undefined;
	return { tag, file, className: declaration.name.text, annotations, defaults, ...(slot ? { slot } : {}) };
}

function hasDecorator(member: ts.PropertyDeclaration, name: string): boolean {
	return (ts.getDecorators(member) ?? []).some((decorator) => {
		const expression = decorator.expression;
		return ts.isCallExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === name;
	});
}

function readAnnotation(member: ts.PropertyDeclaration): DesignAnnotation | undefined {
	const tag = ts.getJSDocTags(member).find((entry) => entry.tagName.text === 'design');
	if (!tag) return undefined;
	const comment = commentOf(tag);
	const [kind, ...rest] = comment.split(/\s+/);
	const text = rest.join(' ');
	switch (kind) {
		case 'variant':
			return text
				? { kind, values: text.split(/\s+/).map((entry) => (entry.includes('=') ? (entry.split('=', 2) as [string, string]) : [entry, entry])) }
				: { kind };
		case 'content':
		case 'toggle':
			if (!text) throw new Error(`@design ${kind} needs a sample text: ${member.name.getText()}`);
			return { kind, text };
		case 'sample':
			return { kind, value: parseSample(text) };
		case 'state':
			if (!text) throw new Error(`@design state needs a value: ${member.name.getText()}`);
			return { kind, value: text };
		default:
			throw new Error(`Unknown @design tag "${comment}" at ${member.name.getText()}`);
	}
}

function commentOf(tag: ts.JSDocTag): string {
	return (typeof tag.comment === 'string' ? tag.comment : (ts.getTextOfJSDocComment(tag.comment) ?? '')).trim();
}

function parseSample(text: string): unknown {
	try {
		return JSON.parse(text) as unknown;
	} catch {
		return text;
	}
}

function literalOf(expression: ts.Expression): boolean | number | string | undefined {
	if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
	if (ts.isNumericLiteral(expression)) return Number(expression.text);
	if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
	if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
	return undefined;
}
