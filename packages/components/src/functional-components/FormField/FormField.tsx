import type { JSX } from '@stencil/core';
import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type { MaxLengthBehaviorPropType, MsgPropType, Stringified, TooltipAlignPropType, VariantClassNamePropType } from '../../schema';
import { buildBadgeTextString, classNameFromVariant, getMsgType, isMsgDefinedAndInputTouched, showExpertSlot } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId } from '../../utils/dev.utils';
import KolFormFieldCharacterLimitHintFc from '../FormFieldCharacterLimitHint/FormFieldCharacterLimitHint';
import KolFormFieldCounterFc from '../FormFieldCounter';
import KolFormFieldHintFc from '../FormFieldHint/FormFieldHint';
import KolFormFieldLabelFc from '../FormFieldLabel';
import KolFormFieldMsgFc from '../FormFieldMsg';

const formFieldTooltipControllerById = new Map<string, TooltipController>();

const getFormFieldTooltipController = (id: string): TooltipController => {
	const tooltipController = formFieldTooltipControllerById.get(id);
	if (tooltipController) {
		return tooltipController;
	}

	const nextTooltipController = new TooltipController(BaseWebComponent.stateLess);
	nextTooltipController.componentWillLoad({ label: '' });
	formFieldTooltipControllerById.set(id, nextTooltipController);
	return nextTooltipController;
};

const destroyFormFieldTooltipController = (id: string): void => {
	const tooltipController = formFieldTooltipControllerById.get(id);
	if (tooltipController) {
		tooltipController.destroy();
		formFieldTooltipControllerById.delete(id);
	}
};

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
	tooltipAlign?: TooltipAlignPropType;
	tooltipFloatingRef?: (el?: HTMLDivElement) => void;
	tooltipArrowRef?: (el?: HTMLDivElement) => void;
	variant?: VariantClassNamePropType;

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
		counter,
		readOnly,
		touched,
		maxLength,
		ariaDescribedBy,
		showBadge,
		tooltipAlign,
		tooltipFloatingRef,
		variant,
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
	const labelId = createRelatedUniqueId(id, 'label');
	const tooltipController = useTooltipInsteadOfLabel ? getFormFieldTooltipController(id) : undefined;

	if (tooltipController) {
		tooltipController.watchAlign(tooltipAlign);
		tooltipController.watchBadgeText(badgeText || '');
		tooltipController.watchId(labelId);
		tooltipController.watchLabel(label);
	} else {
		destroyFormFieldTooltipController(id);
	}

	const forwardedInputRef = formFieldInputProps?.ref as ((el?: HTMLDivElement) => void) | undefined;
	const setInputContainerRef = (el?: HTMLDivElement): void => {
		forwardedInputRef?.(el);
		if (tooltipController && el) {
			tooltipController.initContext(el);
			tooltipController.syncListeners(undefined, el, true);
		}
	};

	let stateCssClasses = {
		['kol-form-field--disabled']: Boolean(disabled),
		['kol-form-field--required']: Boolean(required),
		['kol-form-field--touched']: Boolean(touched),
		['kol-form-field--hide-label']: Boolean(hideLabel),
		['kol-form-field--read-only']: Boolean(readOnly),
		['kol-form-field--hidden-msg']: Boolean(hideMsg),
	};

	if (variant) {
		stateCssClasses = {
			...stateCssClasses,
			[classNameFromVariant(variant, 'form-field')]: variant !== undefined,
		};
	}

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
			<InputContainer {...formFieldInputProps} ref={setInputContainerRef}>
				{children}
				{useTooltipInsteadOfLabel && hideLabel === true && (
					<div class={clsx('kol-form-field__tooltip', formFieldTooltipProps?.class)}>
						<TooltipFC
							badgeText={badgeText || ''}
							label={label}
							align={tooltipAlign}
							id={labelId}
							refFloating={
								tooltipFloatingRef ??
								((el?: HTMLDivElement) => {
									tooltipController?.setTooltipElementRef(el);
								})
							}
						/>
					</div>
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
