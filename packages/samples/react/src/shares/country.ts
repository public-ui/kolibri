import { SelectOption } from '@public-ui/components';
import countries from 'world_countries_lists/data/countries/de/countries.json';

type Country = {
	id: number;
	alpha2: string;
	alpha3: string;
	name: string;
};

export const COUNTRY_OPTIONS: SelectOption<string>[] = [
	...(countries as Country[]).map((country) => ({
		label: country.name,
		value: country.alpha2,
	})),
];

export const COUNTRY_SUGGESTIONS: string[] = [...(countries as Country[]).map((country) => country.name)];
