import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { type AlignPropType, type LabelAlignPropType, buildBadgeTextString, checkHasError, type InternMsgPropType, showExpertSlot } from '../../schema';
import KolFieldControlTooltipFc from '../FormFieldTooltip';
import KolFieldControlLabelFc from '../FormFieldLabel';
import KolFieldControlHintFc from '../FormFieldHint';

export type FieldControlProps = Omit<JSXBase.HTMLAttributes<HTMLElement>, 'id'> & {
	id: string;
	hint?: string;
	label: string;
	hideLabel?: boolean;
	labelAlign?: LabelAlignPropType;
	accessKey?: string;
	shortKey?: string;
	tooltipAlign?: AlignPropType;
	disabled?: boolean;
	msg?: InternMsgPropType;
	touched?: boolean;
	required?: boolean;
	readonly?: boolean;
	showTooltip?: boolean;

	renderNoLabel?: boolean;
	renderNoHint?: boolean;
	renderNoTooltip?: boolean;

	fieldControlLabelProps?: JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & {
		component?: 'label' | 'legend';
		showBadge?: boolean;
	};
	fieldControlInputProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	fieldControlTooltipProps?: Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'>;
	fieldControlHintProps?: JSXBase.HTMLAttributes<HTMLElement>;
};

const InputContainer: FC<JSXBase.HTMLAttributes<HTMLDivElement>> = ({ class: classNames, ...other }, children) => {
	return (
		<div class={clsx('kol-field-control__input', classNames)} {...other}>
			{children}
		</div>
	);
};

const KolFieldControlFc: FC<FieldControlProps> = (props, children) => {
	const {
		class: classNames,
		id,
		disabled,
		label,
		hideLabel,
		labelAlign,
		renderNoTooltip,
		hint,
		renderNoHint,
		tooltipAlign,
		accessKey,
		shortKey,
		msg,
		touched,
		required,
		readonly,
		fieldControlInputProps,
		fieldControlLabelProps,
		fieldControlTooltipProps,
		fieldControlHintProps,
		...other
	} = props;

	const canShowHint = !renderNoHint;
	const canShowTooltip = !renderNoTooltip;
	const showMsg = checkHasError(msg, touched);
	const hasExpertSlot = showExpertSlot(label);
	const useTooltipInsteadOfLabel = canShowTooltip && !hasExpertSlot && hideLabel;
	const badgeText = buildBadgeTextString(accessKey, shortKey);

	const components = [
		<>
			<InputContainer {...fieldControlInputProps}>{children}</InputContainer>
			{useTooltipInsteadOfLabel && (
				<KolFieldControlTooltipFc
					{...(fieldControlTooltipProps || {})}
					id={id}
					label={label}
					hideLabel={hideLabel}
					align={tooltipAlign}
					badgeText={badgeText}
				/>
			)}
		</>,
		<KolFieldControlLabelFc
			{...(fieldControlLabelProps || {})}
			id={id}
			baseClassName="kol-field-control"
			class={clsx(fieldControlLabelProps?.class, {
				['kol-field-control__label--visually-hidden']: Boolean(hideLabel),
			})}
			hasExpertSlot={hasExpertSlot}
			label={label}
			accessKey={accessKey}
			shortKey={shortKey}
		/>,
	];

	if (labelAlign === 'left') {
		components.reverse();
	}

	const stateCssClasses = {
		['kol-field-control--disabled']: Boolean(disabled),
		['kol-field-control--required']: Boolean(required),
		['kol-field-control--touched']: Boolean(touched),
		['kol-field-control--hide-label']: Boolean(hideLabel),
		['kol-field-control--read-only']: Boolean(readonly),
		[`kol-field-control--${msg?.type || 'error'}`]: Boolean(showMsg),
		[`kol-field-control--label-align-${labelAlign}`]: Boolean(labelAlign),
	};

	return (
		<div class={clsx('kol-field-control', stateCssClasses, classNames)} {...other}>
			{components}
			{canShowHint && <KolFieldControlHintFc {...(fieldControlHintProps || {})} baseClassName="kol-field-control" id={id} hint={hint} />}
		</div>
	);
};

export default KolFieldControlFc;
