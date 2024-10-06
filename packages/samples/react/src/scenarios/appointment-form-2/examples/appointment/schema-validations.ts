import * as Yup from 'yup';
import { sleep } from '../../utils/sleep';

const checkAppointmentAvailability = async (time?: string): Promise<boolean> => {
	await sleep(500);
	return time?.endsWith(':30') ?? false;
};

const districtSchema = {
	district: Yup.string().required('Please select district.'),
};

const personalInformationSchema = {
	salutation: Yup.string().required('Please select salutation.'),
	name: Yup.string().required('Please enter your first and last name.'),
	company: Yup.string().when('salutation', {
		is: (salutation: string) => salutation === 'Company',
		then: (schema) => schema.required('Please specify company.'),
	}),
	email: Yup.string().required('Please enter your e-mail address.'),
};

const availableAppointmentsSchema = {
	date: Yup.string().required('Please enter date.'),
	time: Yup.string()
		.required('Please select time.')
		.when('date', {
			is: (date: string) => Boolean(date), // only validate time when date is already set
			then: (schema) => schema.test('checkTimeAvailability', 'Date unfortunately no longer available.', checkAppointmentAvailability),
		}),
};

export const schemaRegistrations = {
	districtSchema: districtSchema,
	personalInformationSchema: personalInformationSchema,
	availableAppointmentsSchema: availableAppointmentsSchema,
};
