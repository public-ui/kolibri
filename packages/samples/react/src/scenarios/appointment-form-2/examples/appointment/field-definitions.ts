import type { FormDefinition, WizardDefinition } from '../../_form-builder-example';

const registrationOfficeForm: FormDefinition = {
	fieldType: 'form',
	schema: 'districtSchema',
	label: '1. Select as District',
	fields: [{ fieldType: 'native-select', name: 'district', queryKey: 'district-query', label: 'District', required: true }],
};

const availableDatesForm: FormDefinition = {
	fieldType: 'form',
	schema: 'availableAppointmentsSchema',
	label: '2. Available Dates',
	fields: [
		{ fieldType: 'input-date', name: 'date', label: 'Date' },
		{
			fieldType: 'conditional',
			name: 'date',
			fields: [
				{ fieldType: 'radio-select', queryKey: 'available-times-query', name: 'time', label: 'Time', orientation: 'horizontal' },
				{ fieldType: 'my-custom-field' },
			],
		},
		{ fieldType: 'field-date-validation-spinner' },
	],
};

const personalDataForm: FormDefinition = {
	fieldType: 'form',
	schema: 'personalInformationSchema',
	label: '3. Enter your contact details',
	fields: [
		{ fieldType: 'native-select', name: 'salutation', queryKey: 'salutation-query', label: 'Salutation', required: true },
		{
			fieldType: 'conditional',
			name: 'salutation',
			conditionalValue: 'Company',
			fields: [
				{
					fieldType: 'input-text',
					label: 'Company',
					name: 'company',
					required: true,
				},
			],
		},
		{ fieldType: 'input-text', name: 'name', label: 'First name and surname', required: true },
		{ fieldType: 'input-email', name: 'email', label: 'E-Mail', required: true },
		{ fieldType: 'input-phone', name: 'phone', label: 'Telephone number', required: false },
	],
};

const summaryFields: FormDefinition = {
	fieldType: 'form',
	label: 'Summary',
	fields: [{ fieldType: 'summary-field' }],
};

const wizard: WizardDefinition = {
	fieldType: 'wizard',
	label: 'Form navigation',
	fields: [registrationOfficeForm, availableDatesForm, personalDataForm, summaryFields],
};

export const fieldDefinitions = wizard;
