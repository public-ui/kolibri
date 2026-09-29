import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { blockInactive } from '../../../utils/element-interaction';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { DefaultInputProps } from './default-input-props';
import { getDefaultInputProps } from './default-input-props';

export type InputFCProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	spellcheck?: boolean;
	/** Rendered after the input; the input references it through `list`. */
	suggestions?: VNode;
	value?: string | number | string[];
} & {
	[key: `aria-${string}`]: unknown;
	[key: `data-${string}`]: unknown;
};

/**
 * Input types whose value is edited as text. A disabled input of these types is rendered `readonly`,
 * because `aria-disabled` alone does not stop typing, pasting, dropping or spinning the value.
 */
const TEXT_LIKE_TYPES = new Set(['date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']);

type KeyDownHandler = JSXBase.InputHTMLAttributes<HTMLInputElement>['onKeyDown'];

/**
 * Keys a disabled text-like input cancels: Enter submits the surrounding form, Space opens the
 * picker of date and time inputs and the step keys change their value, even when they are
 * `readonly` (Chrome).
 */
const BLOCKED_TEXT_KEYS = new Set([' ', 'ArrowDown', 'ArrowUp', 'Enter', 'PageDown', 'PageUp']);

/**
 * All other keys still reach the component, e.g. the arrow keys that move through a radio group.
 */
const guardKeyDown =
	(onKeyDown: KeyDownHandler, isTextLike: boolean): KeyDownHandler =>
	(event: KeyboardEvent) => {
		if (event.key === 'Enter' || (isTextLike && BLOCKED_TEXT_KEYS.has(event.key))) {
			blockInactive(event);
			return;
		}
		onKeyDown?.(event);
	};

/**
 * Native `<input>` of a form field. The input itself is the root of the `kol-input` block, so the
 * block classes are set on it directly instead of through `BemRootNodeFC`.
 */
export const InputFC: FC<InputFCProps> = (props) => {
	const {
		class: classNames,
		msg,
		required,
		disabled,
		touched,
		readonly,
		ariaDescribedBy,
		hideLabel,
		label,
		suggestions,
		value,
		onClick,
		onKeyDown,
		...other
	} = props;
	const isDisabled = Boolean(disabled);
	const type = other.type ?? 'text';
	const isRange = type === 'range';
	const isTextLike = TEXT_LIKE_TYPES.has(type);

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & { 'aria-disabled'?: 'true' } = {
		class: clsx(
			getBlockBem('kol-input')({
				disabled: Boolean(disabled),
				required: Boolean(required),
				touched: Boolean(touched),
				readonly: Boolean(readonly),
				...(isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg) as string]: true } : {}),
			}),
			classNames,
		),
		required: required,
		readonly: Boolean(readonly) || (isDisabled && isTextLike),
		type: 'text',
		list: suggestions && typeof other.id === 'string' ? createRelatedUniqueId(other.id, 'list') : undefined,
		...getDefaultInputProps({ ariaDescribedBy, hideLabel, label }),
		...other,
		'aria-disabled': isDisabled ? 'true' : undefined,
		onClick: isDisabled ? blockInactive : onClick,
		onKeyDown: isDisabled ? guardKeyDown(onKeyDown, isTextLike) : onKeyDown,
		// A range slider is operated by dragging, which no click handler sees.
		onMouseDown: isDisabled && isRange ? blockInactive : other.onMouseDown,
		onPointerDown: isDisabled && isRange ? blockInactive : other.onPointerDown,
		onTouchStart: isDisabled && isRange ? blockInactive : other.onTouchStart,
	};

	return (
		<>
			<input {...inputProps} value={value} />
			{suggestions}
		</>
	);
};
