import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { blockInactive } from '../../../utils/element-interaction';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';

export type InputProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	spellcheck?: boolean;
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

const InputFc: FC<InputProps> = (props) => {
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

	const stateCssClasses = {
		['kol-input--disabled']: Boolean(disabled),
		['kol-input--required']: Boolean(required),
		['kol-input--touched']: Boolean(touched),
		['kol-input--readonly']: Boolean(readonly),
		[`kol-input--${getMsgType(msg)}`]: isMsgDefinedAndInputTouched(msg, touched),
	};

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & { 'aria-disabled'?: 'true' } = {
		class: clsx('kol-input', stateCssClasses, classNames),
		required: required,
		readonly: Boolean(readonly) || (isDisabled && isTextLike),
		type: 'text',
		list: suggestions && typeof other.id === 'string' ? createRelatedUniqueId(other.id, 'list') : undefined,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
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

export default InputFc;
