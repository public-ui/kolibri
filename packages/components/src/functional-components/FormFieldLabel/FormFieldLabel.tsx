import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { SpanFC } from '../../internal/functional-components/span/component';
import type { IconsPropType, PopoverButtonProps } from '../../schema';
import { buildBadgeTextString } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId } from '../../utils/dev.utils';

export type FormFieldLabelInfoPopoverProps = Omit<PopoverButtonProps, '_icons' | '_hideLabel' | '_inline'> & {
	_content: string;
	_icons: IconsPropType;
};

type FormFieldLabelProps = JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & {
	component?: 'label' | 'legend';
	id: string;
	label?: string;
	accessKey?: string;
	shortKey?: string;
	hasExpertSlot?: boolean;
	hideLabel?: boolean;
	baseClassName?: string;
	showBadge?: boolean;
	readOnly?: boolean;
	infoPopover?: FormFieldLabelInfoPopoverProps;
};

const KolFormFieldLabelFc: FC<FormFieldLabelProps> = ({
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
	const translateReadOnly = translate('kol-readonly');
	const badgeText = showBadge === false ? undefined : buildBadgeTextString(accessKey, shortKey);

	// eslint-disable-next-line no-console
	console.log(infoPopover);

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
					({translateReadOnly})
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

export default KolFormFieldLabelFc;
