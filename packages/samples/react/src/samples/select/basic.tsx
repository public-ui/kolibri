import React from 'react';
import { SelectOption } from '@public-ui/components';

import { KolSelect } from '@public-ui/react';

import { FC } from 'react';

import countries from 'world_countries_lists/data/countries/de/countries.json';

import { ERROR_MSG } from '../../shares/constants';

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
	})
);

export const SelectBasic: FC = () => (
	<div className="grid gap-4">
		<KolSelect
			_id=""
			_list={STATUS_OPTIONS}
			_error={ERROR_MSG}
			_touched
			_icon={{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			}}
		>
			Anrede
		</KolSelect>
		<KolSelect _id="" _list={STATUS_OPTIONS} _multiple _required _error={ERROR_MSG}>
			Anrede
		</KolSelect>
	</div>
);
