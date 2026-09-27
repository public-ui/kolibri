import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { blockInactive } from '../../../utils/element-interaction';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';
import NativeOptionListFc, { type NativeOptionListProps } from '../NativeOptionList';

type SelectAttributes = JSXBase.SelectHTMLAttributes<HTMLSelectElement>;

export type SelectProps = DefaultInputProps<SelectAttributes> &
	NativeOptionListProps & {
		touched?: boolean;
		msg?: Stringified<MsgPropType>;
	} & {
		[key: `aria-${string}`]: unknown;
		[key: `data-${string}`]: unknown;
	};

const PASS_THROUGH_KEYS = new Set(['Alt', 'Control', 'Escape', 'Meta', 'Shift', 'Tab']);

/**
 * Keeps a disabled select from opening its picker by keyboard. Its options are natively disabled,
 * so no key can change the value; Tab and modifiers still move the focus.
 */
const blockPickerKeys = (event: KeyboardEvent): void => {
	if (!PASS_THROUGH_KEYS.has(event.key)) {
		event.preventDefault();
	}
};

const NativeSelectFc: FC<SelectProps> = (props) => {
	const {
		class: classNames,
		msg,
		touched,
		disabled,
		required,
		options,
		value,
		OptionProps,
		OptionGroupProps,
		ariaDescribedBy,
		hideLabel,
		label,
		...other
	} = props;

	const stateCssClasses = {
		['kol-select--disabled']: Boolean(disabled),
		['kol-select--required']: Boolean(required),
		['kol-select--touched']: Boolean(touched),
		[`kol-select--${getMsgType(msg)}`]: isMsgDefinedAndInputTouched(msg, touched),
	};

	const inputProps: SelectAttributes & { 'aria-disabled'?: 'true' } = {
		class: clsx('kol-select', stateCssClasses, classNames),
		required: required,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
		...other,
		'aria-disabled': disabled ? 'true' : undefined,
		onClick: disabled ? blockInactive : other.onClick,
		onKeyDown: disabled ? blockPickerKeys : other.onKeyDown,
		onMouseDown: disabled ? blockInactive : other.onMouseDown,
	};

	return (
		<select {...inputProps}>
			<NativeOptionListFc
				baseClassName="kol-select"
				options={options}
				value={value}
				selectDisabled={disabled}
				OptionGroupProps={OptionGroupProps}
				OptionProps={OptionProps}
			/>
		</select>
	);
};

export default NativeSelectFc;
