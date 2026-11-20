import { html, nothing, type TemplateResult } from 'lit';

export type AriaDescriptionSpanLitProps = {
	/** The (already trimmed) description text. Falsy renders nothing. */
	description: string | undefined;
	/** The id referenced by the interactive element's `aria-describedby`. */
	descriptionId: string;
};

/**
 * Lit port of `AriaDescriptionSpanFC` (`internal/functional-components/aria-description-span/component.tsx`).
 * Visually-hidden `aria-describedby` target; must stay a sibling of the interactive element.
 */
export function AriaDescriptionSpanLitFC(props: AriaDescriptionSpanLitProps): TemplateResult {
	const { description, descriptionId } = props;
	return description ? html`<span class="visually-hidden" id="${descriptionId}">${description}</span>` : html`${nothing}`;
}
