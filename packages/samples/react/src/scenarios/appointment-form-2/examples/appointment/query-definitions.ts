import { fetchAvailableTimes, LOCATION_OPTIONS, SALUTATION_OPTIONS } from '../../data';
import { QueryRegistration } from '../../_form-builder-example';

export const queryDefinitions: QueryRegistration = {
	'district-query': {
		queryFn: async () => {
			return Promise.resolve(LOCATION_OPTIONS);
		},
	},
	'salutation-query': {
		queryFn: async () => {
			return Promise.resolve(SALUTATION_OPTIONS);
		},
	},
	'available-times-query': {
		queryFn: fetchAvailableTimes as (data: unknown) => Promise<unknown>,
	},
};
