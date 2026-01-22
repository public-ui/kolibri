import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { isString } from 'lodash-es';
import { translate } from '../../i18n';
import { buildBadgeTextString } from '../../schema';
import clsx from '../../utils/clsx';
import InternalUnderlinedBadgeText from '../InternalUnderlinedBadgeText';

type LabelProps = {
	label?: string;
	accessKey?: string;
	shortKey?: string;
	hasExpertSlot?: boolean;
	showBadge?: boolean;
};

type FormFieldLabelProps = JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & {
	component?: 'label' | 'legend';
	id: string;
	hideLabel?: boolean;
	baseClassName?: string;
	showBadge?: boolean;
	readOnly?: boolean;
} & LabelProps;

const LabelFc: FC<LabelProps> = ({ hasExpertSlot, accessKey, shortKey, label, showBadge = true }) => {
	if (hasExpertSlot) {
		return <slot name="expert"></slot>;
	}

	if (!label) {
		return null;
	}

	const hasBadgeText = isString(accessKey) || isString(shortKey);

	if (!showBadge || !hasBadgeText) {
		return <span>{label}</span>;
	}

	const badgeText = buildBadgeTextString(accessKey, shortKey);

	return (
		<>
			<InternalUnderlinedBadgeText badgeText={badgeText} label={label} />
			&nbsp;
			<kbd class="badge-text-hint" aria-hidden="true">
				{badgeText}
			</kbd>
		</>
	);
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
	showBadge,
	readOnly,
	...other
}) => {
	const useTooltipInsteadOfLabel = !hasExpertSlot && hideLabel;
	const translateReadOnly = translate('kol-readonly');

	return (
		<Component
			{...other}
			class={clsx(`${baseClassName}__label`, classNames)}
			id={!useTooltipInsteadOfLabel ? `${id}-label` : undefined}
			hidden={useTooltipInsteadOfLabel}
			htmlFor={id}
		>
			{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
			<span class={clsx(`${baseClassName}__label-text`)}>
				{/* INFO: label comes with any html tag or as plain text! */}
				<LabelFc hasExpertSlot={hasExpertSlot} accessKey={accessKey} shortKey={shortKey} label={label} showBadge={showBadge} />
				{readOnly ? (
					<span class={clsx(`${baseClassName}__label__read-only`)} aria-hidden="true">
						({translateReadOnly})
					</span>
				) : null}
			</span>
		</Component>
	);
};

export default KolFormFieldLabelFc;
