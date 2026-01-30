import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { KolTooltipWcTag } from '../../core/component-names';
import type { AlignPropType } from '../../schema';
import clsx from '../../utils/clsx';

type FormFieldTooltipProps = Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'> & {
	id: string;
	align?: AlignPropType;
	badgeText?: string;
	label: string;
};

const FormFieldTooltipFc: FC<FormFieldTooltipProps> = ({ id, align, badgeText, label, class: classNames }) => {
	return (
		<KolTooltipWcTag
			/**
			 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
			 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
			 */
			aria-hidden="true"
			class={clsx('kol-form-field__tooltip', classNames)}
			_badgeText={badgeText}
			_align={align}
			_id={`${id}-label`}
			_label={label}
		></KolTooltipWcTag>
	);
};

export default FormFieldTooltipFc;
