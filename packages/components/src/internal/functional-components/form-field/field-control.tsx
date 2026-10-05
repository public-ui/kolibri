import { h, type FunctionalComponent as FC, type VNode } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { FormFieldLabelInfoPopoverProps, LabelAlignPropType, MsgPropType, Stringified, TooltipAlignPropType } from '../../../schema';
import { buildBadgeTextString, getMsgType, isMsgDefinedAndInputTouched, showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { BemRootNodeFC } from '../bem-root-node/component';
import { TooltipFC } from '../tooltip/component';
import { FormFieldHintFC } from './hint';
import { FormFieldLabelFC, type FormFieldLabelFCProps } from './label';

const fieldControlBem = bem.forBlock('kol-field-control');

export type FieldControlFCProps = Omit<JSXBase.HTMLAttributes<HTMLDivElement>, 'id' | 'ref'> & {
	id: string;
	label: string;
	hint?: string;
	hideLabel?: boolean;
	labelAlign?: LabelAlignPropType;
	infoPopover?: FormFieldLabelInfoPopoverProps;
	accessKey?: string;
	shortKey?: string;
	tooltipAlign?: TooltipAlignPropType;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	required?: boolean;
	readOnly?: boolean;
	renderNoHint?: boolean;
	renderNoTooltip?: boolean;
	/** Attributes of the label, e.g. a `mousedown` handler or the access key badge. */
	labelProps?: Pick<FormFieldLabelFCProps, 'onMouseDown' | 'showBadge'>;
	/** Receives the `__input` wrapper, the reference element of the label tooltip. */
	refInput?: (el?: HTMLDivElement) => void;
	/** Receives the floating element of the label tooltip. */
	refTooltip: (el?: HTMLDivElement) => void;
};

/**
 * Whether the control shows its label as a tooltip instead of a visible label: with `hideLabel`,
 * unless the tooltip is disabled or the label is given through the expert slot.
 */
export const isFieldControlLabelShownAsTooltip = ({
	hideLabel,
	label,
	renderNoTooltip,
}: Pick<FieldControlFCProps, 'hideLabel' | 'label' | 'renderNoTooltip'>): boolean => !renderNoTooltip && !showExpertSlot(label) && hideLabel === true;

/**
 * Stateless row of a checkbox or of one radio option: the control, its label and its hint. With
 * `labelAlign: 'left'` the label comes first. The web component owns the label tooltip and connects
 * it through `refInput` and `refTooltip`.
 *
 * The hidden label keeps its id, so with the tooltip the id appears twice (#11114). The tooltip
 * wrapper uses the class `kol-form-field__tooltip`, which the themes style.
 */
export const FieldControlFC: FC<FieldControlFCProps> = (props, children) => {
	const {
		class: classNames,
		id,
		label,
		hint,
		hideLabel,
		labelAlign,
		infoPopover,
		accessKey,
		shortKey,
		tooltipAlign,
		disabled,
		msg,
		touched,
		required,
		readOnly,
		renderNoHint,
		renderNoTooltip,
		labelProps,
		refInput,
		refTooltip,
		...other
	} = props;

	const hasExpertSlot = showExpertSlot(label);
	const showTooltip = isFieldControlLabelShownAsTooltip({ hideLabel, label, renderNoTooltip });
	const badgeText = buildBadgeTextString(accessKey, shortKey);
	const showMsg = isMsgDefinedAndInputTouched(msg, touched);

	const renderInput = (): VNode => (
		<div class={fieldControlBem('input')} ref={refInput}>
			{children}
		</div>
	);
	const renderTooltip = (): VNode | null =>
		showTooltip ? (
			<div class="kol-form-field__tooltip">
				<TooltipFC badgeText={badgeText || ''} label={label} align={tooltipAlign} id={createRelatedUniqueId(id, 'label')} refFloating={refTooltip} />
			</div>
		) : null;
	const renderLabel = (): VNode => (
		<FormFieldLabelFC
			{...labelProps}
			id={id}
			baseClassName="kol-field-control"
			class={hideLabel ? 'kol-field-control__label--visually-hidden' : undefined}
			hasExpertSlot={hasExpertSlot}
			label={label}
			accessKey={accessKey}
			shortKey={shortKey}
			infoPopover={infoPopover}
		/>
	);

	return (
		<BemRootNodeFC
			block="kol-field-control"
			modifiers={{
				disabled: Boolean(disabled),
				required: Boolean(required),
				touched: Boolean(touched),
				'hide-label': Boolean(hideLabel),
				'read-only': Boolean(readOnly),
				...(showMsg ? { [getMsgType(msg) as 'default' | 'error' | 'info' | 'success' | 'warning']: true } : {}),
				'label-align-left': labelAlign === 'left',
				'label-align-right': labelAlign === 'right',
			}}
			class={classNames}
			{...other}
		>
			{labelAlign === 'left' ? [renderLabel(), renderInput(), renderTooltip()] : [renderInput(), renderTooltip(), renderLabel()]}
			{!renderNoHint && <FormFieldHintFC baseClassName="kol-field-control" id={id} hint={hint} />}
		</BemRootNodeFC>
	);
};
