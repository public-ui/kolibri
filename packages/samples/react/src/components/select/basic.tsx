import React, { FC } from 'react';
import { SelectOption } from '@public-ui/components';

import { KolForm, KolSelect } from '@public-ui/react';

import countries from 'world_countries_lists/data/countries/de/countries.json';

import { ERROR_MSG } from '../../shares/constants';

type Country = {
	id: number;
	alpha2: string;
	alpha3: string;
	name: string;
};

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: '- Keine Auswahl',
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

export const SelectBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolSelect
				_options={SALUTATION_OPTIONS}
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

			<KolSelect _options={SALUTATION_OPTIONS} _label="Anrede mit Fehler" _error={ERROR_MSG} _touched />

			<KolSelect _options={COUNTRY_OPTIONS} _label="Mehrfachauswahl" _multiple />

			<KolSelect _options={COUNTRY_OPTIONS} _label="Mehrfachauswahl mit Fehler" _multiple _required _error={ERROR_MSG} _touched />
		</div>
	</KolForm>
);
