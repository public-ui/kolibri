import { Iso8601 } from '@public-ui/components';

export interface FormValues {
	firstname: string;
	middlename: string;
	lastname: string;
	birthdate: Iso8601;
	gender: string;
	address: {
		street: string;
		street2?: string;
	};
}

export const initialValues: FormValues = {
	firstname: '',
	middlename: '',
	lastname: '',
	birthdate: '' as Iso8601,
	gender: '',
	address: {
		street: '',
		street2: '',
	},
};
