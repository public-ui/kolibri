import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
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
import { createRelatedUniqueId } from '../../utils/dev.utils';
import KolFieldControlHintFc from '../FormFieldHint';
import KolFieldControlLabelFc from '../FormFieldLabel';

const fieldControlTooltipBehaviorPool = new Map<string, TooltipBehavior>();

const getFieldControlTooltipBehavior = (id: string): TooltipBehavior => {
	const tooltipBehavior = fieldControlTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		return tooltipBehavior;
	}

	const nextTooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	nextTooltipBehavior.componentWillLoad({ label: '' });
	fieldControlTooltipBehaviorPool.set(id, nextTooltipBehavior);
	return nextTooltipBehavior;
};

const destroyFieldControlTooltipBehavior = (id: string): void => {
	const tooltipBehavior = fieldControlTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		tooltipBehavior.destroy();
		fieldControlTooltipBehaviorPool.delete(id);
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
	const labelId = createRelatedUniqueId(id, 'label');
	const tooltipBehavior = useTooltipInsteadOfLabel ? getFieldControlTooltipBehavior(id) : undefined;

	if (tooltipBehavior) {
		tooltipBehavior.watchAlign(tooltipAlign);
		tooltipBehavior.watchBadgeText(badgeText || '');
		tooltipBehavior.watchId(labelId);
		tooltipBehavior.watchLabel(label);
	} else {
		destroyFieldControlTooltipBehavior(id);
	}

	const forwardedInputRef = fieldControlInputProps?.ref as ((el?: HTMLDivElement) => void) | undefined;
	const setInputContainerRef = (el?: HTMLDivElement): void => {
		forwardedInputRef?.(el);
		if (tooltipBehavior && el) {
			tooltipBehavior.initContext(el);
			tooltipBehavior.syncListeners(undefined, el, true);
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
						id={labelId}
						refFloating={
							tooltipFloatingRef ??
							((el?: HTMLDivElement) => {
								tooltipBehavior?.setTooltipElementRef(el);
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
