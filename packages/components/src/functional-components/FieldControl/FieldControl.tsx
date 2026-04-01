import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import {
	buildBadgeTextString,
	getMsgType,
	isMsgDefinedAndInputTouched,
	showExpertSlot,
	type AlignPropType,
	type LabelAlignPropType,
	type MsgPropType,
	type Stringified,
} from '../../schema';
import clsx from '../../utils/clsx';
import KolFieldControlHintFc from '../FormFieldHint';
import KolFieldControlLabelFc from '../FormFieldLabel';

const fieldControlTooltipControllerById = new Map<string, TooltipController>();

const getFieldControlTooltipController = (id: string): TooltipController => {
	const tooltipController = fieldControlTooltipControllerById.get(id);
	if (tooltipController) {
		return tooltipController;
	}

	const nextTooltipController = new TooltipController(BaseWebComponent.withoutState);
	nextTooltipController.componentWillLoad({ label: '' });
	fieldControlTooltipControllerById.set(id, nextTooltipController);
	return nextTooltipController;
};

const destroyFieldControlTooltipController = (id: string): void => {
	const tooltipController = fieldControlTooltipControllerById.get(id);
	if (tooltipController) {
		tooltipController.destroy();
		fieldControlTooltipControllerById.delete(id);
	}
};

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
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	required?: boolean;
	readonly?: boolean;
	showTooltip?: boolean;
	tooltipFloatingRef?: (el?: HTMLDivElement) => void;
	tooltipArrowRef?: (el?: HTMLDivElement) => void;

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
		accessKey,
		shortKey,
		msg,
		touched,
		required,
		readonly,
		tooltipAlign,
		tooltipFloatingRef,
		fieldControlInputProps,
		fieldControlLabelProps,
		fieldControlTooltipProps,
		fieldControlHintProps,
		...other
	} = props;

	const canShowHint = !renderNoHint;
	const canShowTooltip = !renderNoTooltip;
	const hasExpertSlot = showExpertSlot(label);
	const useTooltipInsteadOfLabel = canShowTooltip && !hasExpertSlot && hideLabel;
	const badgeText = buildBadgeTextString(accessKey, shortKey);
	const tooltipController = useTooltipInsteadOfLabel ? getFieldControlTooltipController(id) : undefined;

	if (tooltipController) {
		tooltipController.watchAlign(tooltipAlign);
		tooltipController.watchBadgeText(badgeText || '');
		tooltipController.watchId(`${id}-label`);
		tooltipController.watchLabel(label);
	} else {
		destroyFieldControlTooltipController(id);
	}

	const forwardedInputRef = fieldControlInputProps?.ref as ((el?: HTMLDivElement) => void) | undefined;
	const setInputContainerRef = (el?: HTMLDivElement): void => {
		forwardedInputRef?.(el);
		if (tooltipController && el) {
			tooltipController.initContext(el);
			tooltipController.syncListeners(undefined, el, true);
		}
	};

	const components = [
		<>
			<InputContainer {...fieldControlInputProps} ref={setInputContainerRef}>
				{children}
			</InputContainer>
			{useTooltipInsteadOfLabel && (
				<div class={clsx('kol-form-field__tooltip', fieldControlTooltipProps?.class)}>
					<TooltipFC
						badgeText={badgeText || ''}
						label={label}
						align={tooltipAlign}
						id={`${id}-label`}
						refFloating={
							tooltipFloatingRef ??
							((el?: HTMLDivElement) => {
								tooltipController?.setTooltipElementRef(el);
							})
						}
					/>
				</div>
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
		[`kol-field-control--${getMsgType(msg)}`]: Boolean(isMsgDefinedAndInputTouched(msg, touched)),
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
