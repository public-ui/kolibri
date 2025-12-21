import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../../shares/constants';

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

// Add onChange handler to log value changes
const ON = {
	onChange: console.info,
};

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
			<KolSelect {...props} _options={SALUTATION_OPTIONS_DISABLED} _label="Salutation with error" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
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
			<KolSelect
				{...props}
				_label="Boolean, Object, Array values"
				_on={ON}
				_options={[
					{
						label: 'True',
						value: true,
					},
					{
						label: 'False',
						value: false,
					},
					{
						label: '1',
						value: 1,
					},
					{
						label: '0',
						value: 0,
					},
					{
						label: 'Object',
						value: {
							key: 'true',
							text: 'This is true',
						},
					},
					{
						label: 'Array',
						value: ['0', '1'],
					},
				]}
				_value={[true]}
			/>
		</div>
	);
});
