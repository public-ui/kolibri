import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components, Optgroup, SelectOption, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';
import { SampleBlock } from '../../SampleBlock';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'Prof. Dr. very long value with more word so it really really breaks the layout ',
		value: 'long',
	},
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

const groupedOptions: GroupedOptionsType = COUNTRY_OPTIONS.reduce((acc, option) => {
	const firstLetter = (option.label as string).charAt(0).toUpperCase();
	if (!acc[firstLetter]) {
		acc[firstLetter] = { label: firstLetter, options: [] };
	}
	acc[firstLetter].options.push({ label: option.label, value: option.label });
	return acc;
}, {} as GroupedOptionsType);

const groupedOptionsArray = Object.values(groupedOptions);

type SelectCasesProps = Components.KolSelect & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const SelectCases = forwardRef<HTMLKolSelectElement, SelectCasesProps>(function SelectCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-salutation-icons`}>
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
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Disabled" _disabled />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-error`}>
				<KolSelect
					{...props}
					_options={SALUTATION_OPTIONS_DISABLED}
					_label="Salutation with error"
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-multiple`}>
				<KolSelect {...props} _options={COUNTRY_OPTIONS} _label="Multiple choice" _multiple />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-multiple-error`}>
				<KolSelect
					{...props}
					_options={COUNTRY_OPTIONS}
					_label="Multiple choice with error"
					_multiple
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_hint={HINT_MSG}
					_touched
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="With short key" _shortKey="s" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-grouped`}>
				<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter" _value="Albanien" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-grouped-multiple`}>
				<KolSelect {...props} _options={groupedOptionsArray} _label="With grouped by first letter (multiple)" _multiple _value={['Albanien']} />
			</SampleBlock>
		</div>
	);
});
