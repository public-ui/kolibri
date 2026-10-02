import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { translate } from '../../../i18n';
import type {
	FormFieldLabelInfoPopoverProps,
	MaxLengthBehaviorPropType,
	MsgPropType,
	Stringified,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../../schema';
import { buildBadgeTextString, classNameFromVariant, getMsgType, isMsgDefinedAndInputTouched, showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { BemRootNodeFC } from '../bem-root-node/component';
import { TooltipFC } from '../tooltip/component';
import { FormFieldHintFC } from './hint';
import { FormFieldLabelFC } from './label';
import { FormFieldMsgFC } from './msg';

const formFieldBem = bem.forBlock('kol-form-field');

export type FormFieldFCProps = Omit<JSXBase.HTMLAttributes<HTMLDivElement>, 'ref'> & {
	id: string;
	alert?: boolean;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
	hint?: string;
	label: string;
	hideLabel?: boolean;
	hideMsg?: boolean;
	infoPopover?: FormFieldLabelInfoPopoverProps;
	accessKey?: string;
	shortKey?: string;
	counter?: {
		maxLengthBehavior: MaxLengthBehaviorPropType;
		maxLength?: number;
		visualRef?: (el?: HTMLSpanElement) => void;
		ariaRef?: (el?: HTMLSpanElement) => void;
	};
	readOnly?: boolean;
	touched?: boolean;
	required?: boolean;
	renderNoLabel?: boolean;
	renderNoTooltip?: boolean;
	renderNoHint?: boolean;
	maxLength?: number;
	showBadge?: boolean;
	tooltipAlign?: TooltipAlignPropType;
	variant?: VariantClassNamePropType;
	/** `fieldset` groups the options of a radio group; its label is then a `legend`. */
	component?: 'div' | 'fieldset';
	/** Arranges the options of a group among each other or side by side. */
	orientation?: 'horizontal' | 'vertical';
	/** Receives the `__input` wrapper, the reference element of the label tooltip. */
	refInput?: (el?: HTMLDivElement) => void;
	/** Receives the floating element of the label tooltip. */
	refTooltip: (el?: HTMLDivElement) => void;
};

/**
 * Whether the field shows its label as a tooltip instead of a visible label: with `hideLabel`,
 * unless the tooltip is disabled or the label is given through the expert slot.
 */
export const isLabelShownAsTooltip = ({ hideLabel, label, renderNoTooltip }: Pick<FormFieldFCProps, 'hideLabel' | 'label' | 'renderNoTooltip'>): boolean =>
	!renderNoTooltip && !showExpertSlot(label) && hideLabel === true;

type MsgTypeModifiers = Partial<
	Record<
		'default' | 'error' | 'info' | 'success' | 'warning' | 'msg-type-default' | 'msg-type-error' | 'msg-type-info' | 'msg-type-success' | 'msg-type-warning',
		boolean
	>
>;

const getMsgTypeModifiers = (msg?: Stringified<MsgPropType>): MsgTypeModifiers => {
	const msgType = getMsgType(msg) as string;
	return { [msgType]: true, [`msg-type-${msgType}`]: true };
};

/**
 * Stateless shell of a form field: label, the input wrapper with the label tooltip, the character
 * counter, the validation message, the hint and the hidden character limit hint. The web component
 * owns the tooltip behavior and connects it through `refInput` and `refTooltip`.
 */
export const FormFieldFC: FC<FormFieldFCProps> = (props, children) => {
	const {
		renderNoLabel,
		renderNoTooltip,
		renderNoHint,
		id,
		required,
		alert,
		disabled,
		class: classNames,
		msg,
		hideMsg,
		hideLabel,
		label,
		infoPopover,
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
		variant,
		component = 'div',
		orientation,
		refInput,
		refTooltip,
		...other
	} = props;

	const hasExpertSlot = showExpertSlot(label);
	const showMsg = isMsgDefinedAndInputTouched(msg, touched);
	const badgeText = buildBadgeTextString(accessKey, shortKey);
	const showTooltip = isLabelShownAsTooltip({ hideLabel, label, renderNoTooltip });
	const isFieldset = component === 'fieldset';

	return (
		<BemRootNodeFC
			component={component}
			block="kol-form-field"
			modifiers={{
				disabled: Boolean(disabled),
				required: Boolean(required),
				touched: Boolean(touched),
				'hide-label': Boolean(hideLabel),
				'read-only': Boolean(readOnly),
				'hidden-msg': Boolean(hideMsg),
				...(showMsg ? getMsgTypeModifiers(msg) : {}),
			}}
			class={clsx(variant && classNameFromVariant(variant, 'form-field'), classNames)}
			aria-describedby={ariaDescribedBy}
			{...other}
		>
			{!renderNoLabel && (
				<FormFieldLabelFC
					component={isFieldset ? 'legend' : 'label'}
					// `FormFieldLabelFC` renders the `__label` element itself, so only the modifier is added here.
					class={isFieldset ? 'kol-form-field__label--legend' : undefined}
					id={id}
					hasExpertSlot={hasExpertSlot}
					hideLabel={hideLabel}
					label={label}
					accessKey={accessKey}
					shortKey={shortKey}
					readOnly={readOnly}
					showBadge={showBadge}
					infoPopover={infoPopover}
				/>
			)}
			<div
				class={formFieldBem('input', {
					'orientation-horizontal': orientation === 'horizontal',
					'orientation-vertical': orientation === 'vertical',
				})}
				ref={refInput}
			>
				{children}
				{showTooltip && (
					<div class={formFieldBem('tooltip')}>
						<TooltipFC badgeText={badgeText || ''} label={label} align={tooltipAlign} id={createRelatedUniqueId(id, 'label')} refFloating={refTooltip} />
					</div>
				)}
			</div>
			{counter && !(counter.maxLengthBehavior === 'soft' && typeof counter.maxLength !== 'number') && (
				<div class={formFieldBem('counter')}>
					<span data-testid="input-counter" aria-hidden="true" class={formFieldBem('counter')} ref={counter.visualRef} />
					<span aria-live="polite" class="visually-hidden" data-testid="input-counter-aria" id={createRelatedUniqueId(id, 'counter')} ref={counter.ariaRef} />
				</div>
			)}
			{showMsg && !hideMsg && <FormFieldMsgFC id={id} alert={alert} msg={msg} />}
			{!renderNoHint && <FormFieldHintFC id={id} hint={hint} />}
			{typeof maxLength === 'number' && !counter && (
				// The hidden character limit hint is only rendered without a counter: the counter spans
				// already announce the maximum.
				<span id={createRelatedUniqueId(id, 'character-limit-hint')} class="visually-hidden">
					{translate('kol-character-limit-hint', { placeholders: { limit: String(maxLength) } })}
				</span>
			)}
		</BemRootNodeFC>
	);
};
