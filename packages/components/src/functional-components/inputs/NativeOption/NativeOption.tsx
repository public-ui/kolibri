import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { StencilUnknown, W3CInputValue } from '../../../schema';
import clsx from 'clsx';

export type NativeOptionProps = Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'> & {
	selectedValue?: StencilUnknown | StencilUnknown[];
	value: StencilUnknown;
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
	if (selectedValue === undefined) {
		selectedValue = [];
	} else if (!Array.isArray(selectedValue)) {
		selectedValue = [selectedValue];
	}

	const isSelected = selected || (selectedValue as StencilUnknown[]).includes(value);

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
			aria-hidden={disabled ? 'true' : undefined} //See Known Issue: https://github.com/public-ui/kolibri/blob/develop/KNOWN_ISSUES.md
			value={index}
			{...other}
		>
			{label}
		</option>
	);
};

export default NativeOptionFc;
