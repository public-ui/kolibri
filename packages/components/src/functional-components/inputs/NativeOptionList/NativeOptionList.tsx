import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import type { SelectOption, W3CInputValue } from '../../../schema';
import NativeOptionFc from '../NativeOption/NativeOption';
import type { JSXBase } from '@stencil/core/internal';

export type NativeOptionListProps = {
	preKey?: string;
	disabled?: boolean;
	value?: W3CInputValue | W3CInputValue[];
	options?: SelectOption<W3CInputValue>[];

	OptionProps?: Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'>;
	OptionGroupProps?: Omit<JSXBase.OptgroupHTMLAttributes<HTMLOptGroupElement>, 'label'>;

	baseClassName?: 'kol-select';
};

const NativeOptionListFc: FC<NativeOptionListProps> = ({
	baseClassName,
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
					if (!options.length) {
						return null;
					}

					const { label, ...other } = option;

					return (
						<optgroup
							class={clsx(`${baseClassName}__optgroup`, { [`${baseClassName}__optgroup--disabled`]: disabled })}
							key={key}
							{...OptionGroupProps}
							label={label?.toString()}
							disabled={disabled}
						>
							<NativeOptionListFc
								baseClassName={baseClassName}
								OptionGroupProps={OptionGroupProps}
								OptionProps={OptionProps}
								value={selectedValue}
								preKey={key}
								{...other}
							/>
						</optgroup>
					);
				}

				if ('value' in option) {
					return <NativeOptionFc key={key} baseClassName={baseClassName} {...OptionProps} index={key} selectedValue={selectedValue} {...option} />;
				}

				return null;
			})}
		</>
	);
};

export default NativeOptionListFc;
