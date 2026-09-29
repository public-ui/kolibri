import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { KolPopoverButtonWcTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import type { FormFieldLabelInfoPopoverProps } from '../../../schema';
import { buildBadgeTextString } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { SpanFC } from '../span/component';

export type FormFieldLabelFCProps = JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & {
	/** `legend` labels the fieldset of a radio group. */
	component?: 'label' | 'legend';
	id: string;
	label?: string;
	accessKey?: string;
	shortKey?: string;
	hasExpertSlot?: boolean;
	hideLabel?: boolean;
	/** Block of the surrounding field, `kol-form-field` or `kol-field-control`. */
	baseClassName?: string;
	showBadge?: boolean;
	readOnly?: boolean;
	infoPopover?: FormFieldLabelInfoPopoverProps;
};

/**
 * Label of a form field with the access key badge, the read-only marker and the info popover. With
 * `hideLabel` the label stays in the DOM, hidden, and the field shows it as a tooltip instead.
 */
export const FormFieldLabelFC: FC<FormFieldLabelFCProps> = ({
	component: Component = 'label',
	id,
	baseClassName = 'kol-form-field',
	class: classNames,
	accessKey,
	shortKey,
	label,
	hideLabel,
	hasExpertSlot,
	showBadge = true,
	readOnly,
	infoPopover,
	...other
}) => {
	const useTooltipInsteadOfLabel = !hasExpertSlot && hideLabel;
	const badgeText = showBadge === false ? undefined : buildBadgeTextString(accessKey, shortKey);

	return (
		<Component
			{...other}
			class={clsx(`${baseClassName}__label`, classNames)}
			id={!useTooltipInsteadOfLabel ? createRelatedUniqueId(id, 'label') : undefined}
			hidden={useTooltipInsteadOfLabel}
			htmlFor={id}
		>
			<SpanFC class={`${baseClassName}__label-text`} label={hasExpertSlot ? '' : (label ?? '')} badgeText={badgeText}>
				<slot name="expert"></slot>
			</SpanFC>
			{!hasExpertSlot && readOnly && (
				<span class={`${baseClassName}__label__read-only`} aria-hidden="true">
					({translate('kol-readonly')})
				</span>
			)}
			{!hasExpertSlot && infoPopover && (
				<KolPopoverButtonWcTag _variant="ghost" {...infoPopover} _hideLabel _inline={true}>
					<div class="kol-popover-button__popover--styled">{infoPopover._content}</div>
				</KolPopoverButtonWcTag>
			)}
		</Component>
	);
};
