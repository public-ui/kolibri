import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components, SelectOption } from '@public-ui/components';
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
		</div>
	);
});
