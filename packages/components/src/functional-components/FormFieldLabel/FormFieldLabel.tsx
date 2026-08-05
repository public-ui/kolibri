import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { SpanFC } from '../../internal/functional-components/span/component';
import { buildBadgeTextString } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId } from '../../utils/dev.utils';

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
	hint?: string;
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
	hint,
	...other
}) => {
	const useTooltipInsteadOfLabel = !hasExpertSlot && hideLabel;
	const translateReadOnly = translate('kol-readonly');
	const badgeText = showBadge === false ? undefined : buildBadgeTextString(accessKey, shortKey);
	const showHint = Boolean(hint);

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
			{showHint && (
				<KolPopoverButtonWcTag
					class={clsx(`${baseClassName}__hint-button`, 'kol-popover-button--inline')}
					_label={translate('kol-hint-button')}
					_hideLabel
					_icons="kolicon-alert-info"
					_popoverAlign="bottom"
					_inline
					_variant="ghost"
				>
					{hint}
				</KolPopoverButtonWcTag>
			)}
			{!hasExpertSlot && readOnly ? (
				<span class={`${baseClassName}__label__read-only`} aria-hidden="true">
					({translateReadOnly})
				</span>
			) : null}
		</Component>
	);
};

export default KolFormFieldLabelFc;
