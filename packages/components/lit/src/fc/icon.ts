import { bem } from '@public-ui/internals/schema/bem-registry';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

const iconBem = bem.forBlock('kol-icon');

export type IconLitProps = {
	class?: string;
	icons: string;
	label: string;
	style?: Record<string, string>;
};

/** Lit port of `IconFC` (`internal/functional-components/icon/component.tsx`). */
export function IconLitFC(props: IconLitProps): TemplateResult {
	const { class: classNames, icons, label, style } = props;
	const hasAriaLabel = label.length > 0;
	return html`<i
		aria-hidden="${hasAriaLabel ? nothing : 'true'}"
		aria-label="${hasAriaLabel ? label : nothing}"
		class="${[iconBem(), iconBem('icon'), icons, classNames].filter((entry) => entry !== undefined && entry.length > 0).join(' ')}"
		role="${hasAriaLabel ? 'img' : 'presentation'}"
		style="${style ? styleMap(style) : nothing}"
	></i>`;
}
