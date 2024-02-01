import React, { forwardRef } from 'react';
import countries from 'world_countries_lists/data/countries/de/countries.json';

import { KolSelect } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components, SelectOption } from '@public-ui/components';
type Country = {
	id: number;
	alpha2: string;
	alpha3: string;
	name: string;
};

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'Keine Auswahl',
		value: '',
		disabled: true,
	},
	{
		label: 'Frau',
		value: 'Frau',
	},
	{
		label: 'Herr',
		value: 'Herr',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

const COUNTRY_OPTIONS: SelectOption<string>[] = [
	...(countries as Country[]).map((country) => ({
		label: country.name,
		value: country.alpha2,
	})),
];

export const SelectCases = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolSelect
				{...props}
				ref={ref}
				_accessKey="a"
				_options={SALUTATION_OPTIONS}
				_label="Anrede"
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
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Anrede mit Fehler" _error={ERROR_MSG} _touched />
			<KolSelect {...props} _options={COUNTRY_OPTIONS} _label="Mehrfachauswahl" _multiple />
			<KolSelect {...props} _options={COUNTRY_OPTIONS} _label="Mehrfachauswahl mit Fehler" _multiple _required _error={ERROR_MSG} _touched />
		</div>
	);
});
