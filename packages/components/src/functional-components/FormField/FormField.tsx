import type { JSX } from '@stencil/core';
import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFormFieldMsgFc from '../FormFieldMsg';
import KolFormFieldLabelFc from '../FormFieldLabel';
import KolFormFieldHintFc from '../FormFieldHint/FormFieldHint';
import KolFormFieldCounterFc from '../FormFieldCounter';
import KolFormFieldTooltipFc from '../FormFieldTooltip';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import type { AlignPropType, InternMsgPropType } from '../../schema';
import { buildBadgeTextString, checkHasError, showExpertSlot } from '../../schema';

function getModifierClassNameByMsgType(msg?: { type?: string }): string {
	if (msg?.type) {
		return (
			{
				default: 'msg-type-default',
				info: 'msg-type-info',
				success: 'msg-type-success',
				warning: 'msg-type-warning',
				error: 'msg-type-error',
			}[msg?.type] || ''
		);
	}

	return '';
}

export type FormFieldProps = Omit<JSXBase.HTMLAttributes<HTMLElement>, 'id'> & {
	component?: 'div' | 'fieldset';
	id: string;
	alert?: boolean;
	disabled?: boolean;
	msg?: InternMsgPropType;
	tooltipAlign?: AlignPropType;
	hint?: string;
	label: string;
	hideLabel?: boolean;
	hideError?: boolean;
	accessKey?: string;
	shortKey?: string;
	counter?: { currentLength?: number; maxLength?: number };
	readOnly?: boolean;
	touched?: boolean;
	required?: boolean;
	renderNoLabel?: boolean;
	renderNoTooltip?: boolean;
	renderNoHint?: boolean;
	anotherChildren?: JSX.Element | JSX.Element[];

	formFieldLabelProps?: JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & { component?: 'label' | 'legend' };
	formFieldHintProps?: JSXBase.HTMLAttributes<HTMLElement>;
	formFieldTooltipProps?: Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'>;
	formFieldMsgProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	formFieldCounterProps?: JSXBase.HTMLAttributes<HTMLSpanElement>;
	formFieldInputProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
} & {
	[key: `data-${string}`]: unknown;
};

const InputContainer: FC<JSXBase.HTMLAttributes<HTMLDivElement>> = ({ class: classNames, ...other }, children) => {
	return (
		<div class={clsx('kol-form-field__input', classNames)} {...other}>
			{children}
		</div>
	);
};

const KolFormFieldFc: FC<FormFieldProps> = (props, children) => {
	const {
		component: Component = 'div',
		renderNoLabel,
		renderNoTooltip,
		renderNoHint,
		anotherChildren,
		id,
		required,
		alert,
		disabled,
		class: classNames,
		msg,
		hideError,
		hideLabel,
		label,
		hint,
		accessKey,
		shortKey,
		tooltipAlign,
		counter,
		readOnly,
		touched,
		formFieldLabelProps,
		formFieldHintProps,
		formFieldTooltipProps,
		formFieldMsgProps,
		formFieldCounterProps,
		formFieldInputProps,
		...other
	} = props;

	const showLabel = !renderNoLabel;
	const showHint = !renderNoHint;
	const showTooltip = !renderNoTooltip;
	const hasExpertSlot = showExpertSlot(label);
	const showMsg = checkHasError(msg, touched);
	const badgeText = buildBadgeTextString(accessKey, shortKey);
	const useTooltipInsteadOfLabel = showTooltip && !hasExpertSlot && hideLabel;

	let stateCssClasses = {
		['kol-form-field--disabled']: Boolean(disabled),
		['kol-form-field--required']: Boolean(required),
		['kol-form-field--touched']: Boolean(touched),
		['kol-form-field--hide-label']: Boolean(hideLabel),
		['kol-form-field--read-only']: Boolean(readOnly),
		['kol-form-field--hidden-error']: Boolean(hideError),
	};

	if (showMsg) {
		stateCssClasses = {
			...stateCssClasses,
			[`kol-form-field--${msg?.type || 'error'}`]: true,
			[`kol-form-field--${getModifierClassNameByMsgType(msg)}`]: true,
		};
	}

	return (
		<Component
			class={clsx('kol-form-field', stateCssClasses, classNames)}
			role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
			{...other}
		>
			{showLabel && (
				<KolFormFieldLabelFc
					{...(formFieldLabelProps || {})}
					id={id}
					hasExpertSlot={hasExpertSlot}
					hideLabel={hideLabel}
					label={label}
					accessKey={accessKey}
					shortKey={shortKey}
				/>
			)}
			<InputContainer {...formFieldInputProps}>
				{children}
				{useTooltipInsteadOfLabel && (
					<KolFormFieldTooltipFc {...(formFieldTooltipProps || {})} id={id} label={label} hideLabel={hideLabel} align={tooltipAlign} badgeText={badgeText} />
				)}
			</InputContainer>
			{counter ? <KolFormFieldCounterFc {...(formFieldCounterProps || {})} {...counter} /> : null}
			{showMsg && <KolFormFieldMsgFc {...(formFieldMsgProps || {})} id={id} alert={alert} msg={msg} hideError={hideError} />}
			{showHint && <KolFormFieldHintFc {...(formFieldHintProps || {})} id={id} hint={hint} />}
			{anotherChildren}
		</Component>
	);
};

export default KolFormFieldFc;
