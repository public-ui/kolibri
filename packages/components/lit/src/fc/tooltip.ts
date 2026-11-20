import { bem } from '@public-ui/internals/schema/bem-registry';
import { html, type TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { SpanLitFC } from './span';

const tooltipBem = bem.forBlock('kol-tooltip');

export type TooltipLitProps = {
	badgeText?: string;
	id?: string;
	label: string;
	refFloating: (el?: HTMLDivElement) => void;
};

/** Lit port of `TooltipFC` (`internal/functional-components/tooltip/component.tsx`). */
export function TooltipLitFC(props: TooltipLitProps): TemplateResult {
	const { label, badgeText, id, refFloating } = props;
	return html`<div class="${tooltipBem('floating')}" ?hidden="${!label}" ${ref(refFloating)}>
		<div class="${tooltipBem('arrow')}"></div>
		${SpanLitFC({ badgeText, id, label, class: tooltipBem('content') })}
	</div>`;
}
