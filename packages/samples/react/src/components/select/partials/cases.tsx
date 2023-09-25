import React, { forwardRef } from 'react';

import { Components, SelectOption } from '@public-ui/components';
import { KolSelect } from '@public-ui/react';
import { ERROR_MSG } from '../../../shares/constants';

import countries from 'world_countries_lists/data/countries/de/countries.json';

const STATUS_OPTIONS: SelectOption<string>[] = [
	{
		label: '- Keine Auswahl',
		value: '',
		disabled: true,
	},
];

type Country = {
	id: number;
	alpha2: string;
	alpha3: string;
	name: string;
};
(countries as Country[]).forEach((country) =>
	STATUS_OPTIONS.push({
		label: country.name,
		value: country.alpha2,
	}),
);

export const SelectCases = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolSelect
				{...props}
				ref={ref}
				_options={STATUS_OPTIONS}
				_error={ERROR_MSG}
				_label="Anrede"
				_icon={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolSelect {...props} _options={STATUS_OPTIONS} _label="Anrede" _multiple _required _error={ERROR_MSG} _touched />
		</div>
	);
});
