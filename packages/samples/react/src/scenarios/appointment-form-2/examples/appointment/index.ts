import type { FormBuilderSettingsType } from '../../_form-builder-example/types';
import { initialValues, type FormValues } from './form-values';
import { fieldDefinitions } from './field-definitions';
import { queryDefinitions } from './query-definitions';
import { customFieldRegistrations } from './field-registration';
import { schemaRegistrations } from './schema-validations';

const appointmentSettings: FormBuilderSettingsType<FormValues> = {
	initialValues: initialValues,
	fieldDefinitions: fieldDefinitions,
	queryDefinitions: queryDefinitions,
	customFieldRegistrations: customFieldRegistrations,
	schemaRegistrations: schemaRegistrations,
};

export default appointmentSettings;
