import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components, SelectOption } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'No salutation',
		value: '',
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

const SALUTATION_OPTIONS_DISABLED = SALUTATION_OPTIONS.map((option, index) =>
	index === 0 ? { label: 'Select salutation', value: '', disabled: true } : option,
);

type GroupedOptionsType = Record<string, Optgroup<StencilUnknown>>;

const countryOptions = COUNTRY_OPTIONS as SelectOption<string>[];

type OptionGroup = { label: string; options: Array<SelectOption<string>> };
const groupedOptions: Record<string, OptionGroup> = countryOptions.reduce<Record<string, OptionGroup>>((acc, option: SelectOption<string>) => {
	const label = String((option as { label?: unknown }).label ?? '');
	const firstLetter = label.charAt(0).toUpperCase();
	if (!acc[firstLetter]) {
		acc[firstLetter] = { label: firstLetter, options: [] };
	}
	acc[firstLetter].options.push({ label, value: label });
	return acc;
}, {});

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
						icon: 'kolicon-chevron-left',
					},
					right: {
						icon: 'kolicon-chevron-right',
					},
				}}
			/>
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Disabled" _disabled />
			<KolSelect {...props} _options={SALUTATION_OPTIONS_DISABLED} _label="Salutation with error" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolSelect {...props} _options={countryOptions} _label="Multiple choice" _multiple />
			<KolSelect
				{...props}
				_options={countryOptions}
				_label="Multiple choice with error"
				_multiple
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_hint={HINT_MSG}
				_touched
			/>
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With access key" _accessKey="c" />
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With short key" _shortKey="s" />
			<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter" _value="Albanien" />
			<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter (multiple)" _multiple _value={['Albanien']} />
		</div>
	);
});
