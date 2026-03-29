import type { JSX } from '@stencil/core';
import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { AlignPropType, MaxLengthBehaviorPropType, MsgPropType, Stringified } from '../../schema';
import { buildBadgeTextString, getMsgType, isMsgDefinedAndInputTouched, showExpertSlot } from '../../schema';
import clsx from '../../utils/clsx';
import KolFormFieldCharacterLimitHintFc from '../FormFieldCharacterLimitHint/FormFieldCharacterLimitHint';
import KolFormFieldCounterFc from '../FormFieldCounter';
import KolFormFieldHintFc from '../FormFieldHint/FormFieldHint';
import KolFormFieldLabelFc from '../FormFieldLabel';
import KolFormFieldMsgFc from '../FormFieldMsg';
import KolFormFieldTooltipFc from '../FormFieldTooltip';

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

export type FormFieldProps = JSXBase.HTMLAttributes<HTMLElement> & {
	component?: 'div' | 'fieldset';
	id: string;
	alert?: boolean;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
	tooltipAlign?: AlignPropType;
	hint?: string;
	label: string;
	hideLabel?: boolean;
	hideMsg?: boolean;
	accessKey?: string;
	shortKey?: string;
	counter?: { currentLength: number; currentLengthDebounced: number; maxLengthBehavior: MaxLengthBehaviorPropType; maxLength?: number; id?: string };
	readOnly?: boolean;
	touched?: boolean;
	required?: boolean;
	renderNoLabel?: boolean;
	renderNoTooltip?: boolean;
	renderNoHint?: boolean;
	anotherChildren?: JSX.Element | JSX.Element[];
	maxLength?: number;
	showBadge?: boolean;

	formFieldLabelProps?: JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & { component?: 'label' | 'legend' };
	formFieldHintProps?: JSXBase.HTMLAttributes<HTMLElement>;
	formFieldTooltipProps?: Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'>;
	formFieldMsgProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	formFieldInputProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
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
		hideMsg,
		hideLabel,
		label,
		hint,
		accessKey,
		shortKey,
		tooltipAlign,
		counter,
		readOnly,
		touched,
		maxLength,
		ariaDescribedBy,
		showBadge,
		formFieldLabelProps,
		formFieldHintProps,
		formFieldTooltipProps,
		formFieldMsgProps,
		formFieldInputProps,
		...other
	} = props;

	const showLabel = !renderNoLabel;
	const showHint = !renderNoHint;
	const showTooltip = !renderNoTooltip;
	const hasExpertSlot = showExpertSlot(label);
	const showMsg = isMsgDefinedAndInputTouched(msg, touched);
	const badgeText = buildBadgeTextString(accessKey, shortKey);
	const useTooltipInsteadOfLabel = showTooltip && !hasExpertSlot && hideLabel;

	let stateCssClasses = {
		['kol-form-field--disabled']: Boolean(disabled),
		['kol-form-field--required']: Boolean(required),
		['kol-form-field--touched']: Boolean(touched),
		['kol-form-field--hide-label']: Boolean(hideLabel),
		['kol-form-field--read-only']: Boolean(readOnly),
		['kol-form-field--hidden-msg']: Boolean(hideMsg),
	};

	if (showMsg) {
		const msgType = getMsgType(msg);

		stateCssClasses = {
			...stateCssClasses,
			[`kol-form-field--${msgType}`]: true,
			[`kol-form-field--${getModifierClassNameByMsgType({ type: msgType })}`]: true,
		};
	}

	return (
		<Component class={clsx('kol-form-field', stateCssClasses, classNames)} aria-describedby={ariaDescribedBy} {...other}>
			{showLabel && (
				<KolFormFieldLabelFc
					{...(formFieldLabelProps || {})}
					id={id}
					hasExpertSlot={hasExpertSlot}
					hideLabel={hideLabel}
					label={label}
					accessKey={accessKey}
					shortKey={shortKey}
					readOnly={readOnly}
					showBadge={showBadge}
				/>
			)}
			<InputContainer {...formFieldInputProps}>
				{children}
				{useTooltipInsteadOfLabel && hideLabel === true && (
					<KolFormFieldTooltipFc {...(formFieldTooltipProps || {})} id={id} label={label} align={tooltipAlign} badgeText={badgeText} />
				)}
			</InputContainer>
			{counter ? <KolFormFieldCounterFc id={id} {...counter} /> : null}
			{maxLength ? <KolFormFieldCharacterLimitHintFc id={id} maxLength={maxLength} /> : null}
			{showMsg && !hideMsg && <KolFormFieldMsgFc {...(formFieldMsgProps || {})} id={id} alert={alert} msg={msg} />}
			{showHint && <KolFormFieldHintFc {...(formFieldHintProps || {})} id={id} hint={hint} />}
			{anotherChildren}
		</Component>
	);
};

export default KolFormFieldFc;
