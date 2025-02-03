import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components, Optgroup, SelectOption, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'No choice',
		value: '',
		disabled: true,
	},
	{
		label: 'Mrs.',
		value: 'Mrs.',
	},
	{
		label: 'Mr.',
		value: 'Mr.',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

type GroupedOptionsType = Record<string, Optgroup<StencilUnknown>>;

const groupedOptions: GroupedOptionsType = COUNTRY_OPTIONS.reduce((acc, option) => {
	const firstLetter = (option.label as string).charAt(0).toUpperCase();
	if (!acc[firstLetter]) {
		acc[firstLetter] = { label: firstLetter, options: [] };
	}
	acc[firstLetter].options.push({ label: option.label, value: option.label });
	return acc;
}, {} as GroupedOptionsType);

const groupedOptionsArray = Object.values(groupedOptions);

export const SelectCases = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolSelect
				{...props}
				ref={ref}
				_accessKey="a"
				_options={SALUTATION_OPTIONS}
				_label="Salutation"
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Disabled" _disabled />
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Salutation with error" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolSelect {...props} _options={COUNTRY_OPTIONS} _label="Multiple choice" _multiple />
			<KolSelect
				{...props}
				_options={COUNTRY_OPTIONS}
				_label="Multiple choice with error"
				_multiple
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
			/>
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With access key" _accessKey="c" />
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With short key" _shortKey="s" />
			<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter" _value={['Albanien']} />
			<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter (multiple)" _multiple _value={['Albanien']} />
		</div>
	);
});
