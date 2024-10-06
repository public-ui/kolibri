import { type FormBuilderSettingsType } from '../../_form-builder-example';
import { fieldDefinitions } from './field-definitions';
import { type FormValues, initialValues } from './form-values';

const registionSettings: FormBuilderSettingsType<FormValues> = {
	initialValues: initialValues,
	fieldDefinitions: fieldDefinitions,
};

export default registionSettings;
