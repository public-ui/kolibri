import type { FC } from 'react';
import React from 'react';

import { KolSelect } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';
import type { Optgroup, SelectOption, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../shares/country';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{ label: 'No salutation', value: '' },
	{ label: 'Mrs.', value: 'Mrs.' },
	{ label: 'Mr.', value: 'Mr.' },
	{ label: 'Divers', value: 'Divers' },
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

export const SelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSelect renders a select field. The sample shows KolSelect in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolSelect
				_accessKey="a"
				_options={SALUTATION_OPTIONS}
				_label="Salutation"
				_icons={{ left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } }}
			/>
			<KolSelect _options={SALUTATION_OPTIONS} _label="Disabled" _disabled />
			<KolSelect _options={SALUTATION_OPTIONS_DISABLED} _label="Salutation with error" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolSelect _options={COUNTRY_OPTIONS} _label="Multiple choice" _multiple />
			<KolSelect
				_options={COUNTRY_OPTIONS}
				_label="Multiple choice with error"
				_multiple
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_hint={HINT_MSG}
				_touched
			/>
			<KolSelect _options={SALUTATION_OPTIONS} _label="With access key" _accessKey="c" />
			<KolSelect _options={SALUTATION_OPTIONS} _label="With short key" _shortKey="s" />
			<KolSelect _options={groupedOptionsArray} _label="With grouped by first letter" _value="Albanien" />
			<KolSelect _options={groupedOptionsArray} _label="With grouped by first letter (multiple)" _multiple _value={['Albanien']} />
		</div>
	</>
);
