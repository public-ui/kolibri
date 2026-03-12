import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type { AlignPropType } from '../../schema';
import clsx from '../../utils/clsx';

// Stable ref holder — prevents creating new ref callbacks on every render
class TooltipStableRefs {
	public readonly ctrl: TooltipController;
	public readonly containerRef: (el?: HTMLDivElement) => void;
	public readonly tooltipRef: (el?: HTMLDivElement) => void;
	public readonly arrowRef: (el?: HTMLDivElement) => void;

	constructor(id: string) {
		this.ctrl = new TooltipController(id);
		this.containerRef = (el) => {
			if (!el) {
				formFieldTooltipRefs.delete(this.ctrl.id);
				this.ctrl.destroy();
			}
			this.ctrl.setContainerRef(el);
		};
		this.tooltipRef = (el) => this.ctrl.setTooltipElementRef(el);
		this.arrowRef = (el) => this.ctrl.setArrowElementRef(el);
	}
}

const formFieldTooltipRefs = new Map<string, TooltipStableRefs>();

function getOrCreateRefs(id: string): TooltipStableRefs {
	let refs = formFieldTooltipRefs.get(id);
	if (!refs) {
		refs = new TooltipStableRefs(id);
		formFieldTooltipRefs.set(id, refs);
	}
	return refs;
}

type FormFieldTooltipProps = Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'> & {
	id: string;
	align?: AlignPropType;
	badgeText?: string;
	label: string;
};

const FormFieldTooltipFc: FC<FormFieldTooltipProps> = ({ id, align, badgeText, label, class: classNames }) => {
	const tooltipId = `${id}-label`;
	const refs = getOrCreateRefs(tooltipId);
	refs.ctrl.setAlign(align ?? 'top');

	return (
		<TooltipFC
			aria-hidden="true"
			class={clsx('kol-form-field__tooltip', classNames)}
			label={label}
			align={align || 'bottom'}
			badgeText={badgeText || ''}
			id={refs.ctrl.id}
			containerRef={refs.containerRef}
			tooltipRef={refs.tooltipRef}
			arrowRef={refs.arrowRef}
		/>
	);
};

export default FormFieldTooltipFc;
