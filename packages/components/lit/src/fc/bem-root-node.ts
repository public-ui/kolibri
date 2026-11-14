import type { KoliBriComponentsBemSchema } from '@public-ui/internals/schema/bem-registry';
import { html, nothing, type TemplateResult } from 'lit';
import { Directive, PartType, directive, type ElementPart, type PartInfo } from 'lit/directive.js';

type ModifiersOf<TBlock extends keyof KoliBriComponentsBemSchema> = KoliBriComponentsBemSchema[TBlock] extends {
	modifiers: Set<infer TModifier> | null;
}
	? { [K in TModifier & string]?: boolean }
	: never;

export type BemRootLitProps<TBlock extends keyof KoliBriComponentsBemSchema> = {
	modifiers?: ModifiersOf<TBlock>;
	class?: string | (string | false | undefined)[];
	/** Forwarded HTML attributes ("rest" of the original FC); rendered verbatim on the root node. */
	attrs?: Record<string, string | number | boolean | undefined>;
};

type AttributeRecord = Record<string, string | number | boolean | undefined>;

/**
 * Element-part directive that forwards an arbitrary attribute record onto its host element —
 * the lit-html equivalent of the original FCs' `{...rest}` JSX spread. Attributes are removed
 * again when their value becomes `undefined`.
 */
class SpreadAttributes extends Directive {
	private previous: AttributeRecord = {};

	constructor(partInfo: PartInfo) {
		super(partInfo);
		if (partInfo.type !== PartType.ELEMENT) {
			throw new Error('spreadAttrs may only be used on an element');
		}
	}

	// The directive body produces no template output; all work happens in `update`.
	render(): unknown {
		return nothing;
	}

	update(part: ElementPart, [attrs = {}]: [AttributeRecord | undefined]): unknown {
		const element = part.element as HTMLElement;
		const next = attrs ?? {};
		for (const key of Object.keys(this.previous)) {
			if (!(key in next) || next[key] === undefined) {
				element.removeAttribute(key);
			}
		}
		for (const [key, value] of Object.entries(next)) {
			if (value === undefined) {
				element.removeAttribute(key);
			} else if (value === true) {
				element.setAttribute(key, '');
			} else {
				element.setAttribute(key, String(value));
			}
		}
		this.previous = next;
		return nothing;
	}
}

export const spreadAttrs = directive(SpreadAttributes);

export function BemRootLitFC<TBlock extends keyof KoliBriComponentsBemSchema>(
	blockBem: (modifiers?: ModifiersOf<TBlock>) => string,
	props: BemRootLitProps<TBlock>,
	children: TemplateResult,
): TemplateResult {
	const { modifiers, class: hostClass, attrs } = props;
	const classEntries = hostClass === undefined ? [] : Array.isArray(hostClass) ? hostClass : [hostClass];
	const className = [blockBem(modifiers), ...classEntries]
		.filter((entry) => typeof entry === 'string' && entry.length > 0)
		.join(' ')
		// `classNameFromVariant` appends a trailing space per array variant; the Stencil vdom
		// trims the class attribute, lit-html does not — replicate the trimming here.
		.trim();
	return html`<div class="${className}" ${spreadAttrs(attrs)}>${children}</div>`;
}
