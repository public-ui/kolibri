import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../../schema';
import clsx from 'clsx';

export type NativeOptionProps = Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'> & {
	selectedValue?: W3CInputValue | W3CInputValue[];
	value: W3CInputValue;
	label: W3CInputValue;
	index?: string | number;
	baseClassName?: 'kol-select' | 'kol-datalist';
};

const NativeOptionFc: FC<NativeOptionProps> = ({
	baseClassName = 'kol-select',
	class: classNames,
	index,
	selectedValue,
	selected,
	value,
	label,
	disabled,
	...other
}) => {
	if (!selectedValue) {
		selectedValue = [];
	} else if (!Array.isArray(selectedValue)) {
		selectedValue = [selectedValue];
	}

	const isSelected = selected || selectedValue.includes(value);

	return (
		<option
			class={clsx(
				`${baseClassName}__option`,
				{
					[`${baseClassName}__option--selected`]: isSelected,
					[`${baseClassName}__option--disabled`]: disabled,
				},
				classNames,
			)}
			selected={isSelected}
			disabled={disabled}
			value={index || value}
			{...other}
		>
			{label}
		</option>
	);
};

export default NativeOptionFc;
