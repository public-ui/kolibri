import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { DefaultInputProps } from './default-input-props';
import { getDefaultInputProps } from './default-input-props';

/**
 * Stencil only writes a property whose value changed: `null` writes the empty value on the first
 * render, `undefined` leaves the native default untouched. A range input, for example, falls back to
 * the middle of its range only when its value is written.
 */
type NullableNativeValue = string | number | null;

export type InputFCProps = Omit<DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>>, 'max' | 'min' | 'step'> & {
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	spellcheck?: boolean;
	/** Rendered after the input; the input references it through `list`. */
	suggestions?: VNode;
	max?: NullableNativeValue;
	min?: NullableNativeValue;
	step?: NullableNativeValue;
	value?: NullableNativeValue | string[];
} & {
	[key: `aria-${string}`]: unknown;
	[key: `data-${string}`]: unknown;
};

/**
 * Native `<input>` of a form field. The input itself is the root of the `kol-input` block, so the
 * block classes are set on it directly instead of through `BemRootNodeFC`.
 */
export const InputFC: FC<InputFCProps> = (props) => {
	const { class: classNames, msg, required, disabled, touched, readonly, ariaDescribedBy, hideLabel, label, suggestions, value, ...other } = props;

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> = {
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
		disabled: disabled,
		readonly: readonly,
		type: 'text',
		list: suggestions && typeof other.id === 'string' ? createRelatedUniqueId(other.id, 'list') : undefined,
		...getDefaultInputProps({ ariaDescribedBy, hideLabel, label }),
		...(other as JSXBase.InputHTMLAttributes<HTMLInputElement>),
	};

	return (
		<>
			<input {...inputProps} value={value as JSXBase.InputHTMLAttributes<HTMLInputElement>['value']} />
			{suggestions}
		</>
	);
};
