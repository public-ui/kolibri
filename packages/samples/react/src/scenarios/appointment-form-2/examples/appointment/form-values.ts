import { Iso8601 } from '@public-ui/components';

export interface FormValues {
	district: string;
	date: Iso8601;
	time: Iso8601;
	salutation: string;
	name: string;
	company: string;
	email: string;
	phone: string;
}

export const initialValues: FormValues = {
	district: '',
	date: '' as Iso8601,
	time: '' as Iso8601,
	salutation: '',
	name: '',
	company: '',
	email: '',
	phone: '',
};
