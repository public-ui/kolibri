import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { MsgPropType, SelectOption, StencilUnknown, Stringified, W3CInputValue } from '../../../schema';
import { getMsgType, isMsgDefinedAndInputTouched } from '../../../schema';
import clsx from '../../../utils/clsx';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { DefaultInputProps } from './default-input-props';
import { getDefaultInputProps } from './default-input-props';

const selectBem = getBlockBem('kol-select');

type SelectAttributes = JSXBase.SelectHTMLAttributes<HTMLSelectElement>;

export type SelectOptionFCProps = Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'> & {
	/** The value, or the list of values, of the selected options. */
	selectedValue?: StencilUnknown | StencilUnknown[];
	value: StencilUnknown;
	label: W3CInputValue;
	/** The key of the option, rendered as its native value; the field maps it back to `value`. */
	index?: string | number;
};

export type SelectOptionListFCProps = {
	/** Key prefix of the options in an optgroup. */
	preKey?: string;
	disabled?: boolean;
	value?: StencilUnknown | StencilUnknown[];
	options?: SelectOption<StencilUnknown>[];
	OptionProps?: Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'>;
	OptionGroupProps?: Omit<JSXBase.OptgroupHTMLAttributes<HTMLOptGroupElement>, 'label'>;
};

export type SelectFCProps = DefaultInputProps<SelectAttributes> &
	SelectOptionListFCProps & {
		touched?: boolean;
		msg?: Stringified<MsgPropType>;
	} & {
		[key: `aria-${string}`]: unknown;
		[key: `data-${string}`]: unknown;
	};

/**
 * Native `<option>`. Its native value is the key (`-<index>`, in an optgroup `-<group>-<index>`), not
 * the option value, because a native value can only be a string.
 */
export const SelectOptionFC: FC<SelectOptionFCProps> = ({ class: classNames, index, selectedValue, selected, value, label, disabled, ...other }) => {
	const selectedValues = selectedValue === undefined ? [] : Array.isArray(selectedValue) ? selectedValue : [selectedValue];
	const isSelected = selected || selectedValues.includes(value);

	return (
		<option
			class={clsx(selectBem('option', { selected: Boolean(isSelected), disabled: Boolean(disabled) }), classNames)}
			selected={isSelected}
			disabled={disabled}
			value={index}
			{...other}
		>
			{label}
		</option>
	);
};

/** Options and optgroups of a native select, recursively; an optgroup prefixes the keys of its options. */
export const SelectOptionListFC: FC<SelectOptionListFCProps> = ({
	preKey,
	options,
	disabled,
	value: selectedValue,
	OptionProps = {},
	OptionGroupProps = {},
}) => {
	if (!options?.length) {
		return null;
	}

	return (
		<>
			{options.map((option, index) => {
				const key = [preKey, `-${index}`].join('');

				if ('options' in option) {
					const { label, ...other } = option;

					return (
						<optgroup
							class={selectBem('optgroup', { disabled: Boolean(disabled) })}
							key={key}
							{...OptionGroupProps}
							label={label?.toString()}
							disabled={disabled}
						>
							<SelectOptionListFC OptionGroupProps={OptionGroupProps} OptionProps={OptionProps} value={selectedValue} preKey={key} {...other} />
						</optgroup>
					);
				}

				if ('value' in option) {
					return <SelectOptionFC key={key} {...OptionProps} index={key} selectedValue={selectedValue} {...option} />;
				}

				return null;
			})}
		</>
	);
};

/**
 * Native `<select>` of a form field with its options. The select itself is the root of the
 * `kol-select` block, so the block classes are set on it directly instead of through `BemRootNodeFC`.
 */
export const SelectFC: FC<SelectFCProps> = (props) => {
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

	const selectProps: SelectAttributes = {
		class: clsx(
			selectBem({
				disabled: Boolean(disabled),
				required: Boolean(required),
				touched: Boolean(touched),
				...(isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg) as string]: true } : {}),
			}),
			classNames,
		),
		required: required,
		disabled: disabled,
		...getDefaultInputProps({ ariaDescribedBy, hideLabel, label }),
		...other,
	};

	return (
		<select {...selectProps}>
			<SelectOptionListFC options={options} value={value} OptionGroupProps={OptionGroupProps} OptionProps={OptionProps} />
		</select>
	);
};
