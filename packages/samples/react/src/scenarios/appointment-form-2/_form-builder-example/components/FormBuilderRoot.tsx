import * as React from 'react';
import { FormBuilder } from './builders';
import type { FormBuilderSettingsType } from '../types';
import SchemaValidationProvider from '../providers/SchemaValidationProvider';
import FormBuilderProvider from '../providers/FormBuilderProvider';
import DataQueryProvider from '../providers/DataQueryProvider';
import CustomFieldProvider from '../providers/CustomFieldProvider';

type FormBuilderRootProps<T extends object> = {
	settings: FormBuilderSettingsType<T>;
};

function FormBuilderRoot<T extends object>({ settings }: FormBuilderRootProps<T>) {
	const { fieldDefinitions, customFieldRegistrations = {}, schemaRegistrations = {}, initialValues, queryDefinitions = {} } = settings;

	return (
		<SchemaValidationProvider schemaRegistrations={schemaRegistrations}>
			<FormBuilderProvider initialValue={initialValues}>
				<DataQueryProvider queryRegistrations={queryDefinitions}>
					<CustomFieldProvider customFieldRegistrations={customFieldRegistrations}>
						<FormBuilder field={fieldDefinitions} />
					</CustomFieldProvider>
				</DataQueryProvider>
			</FormBuilderProvider>
		</SchemaValidationProvider>
	);
}

export default FormBuilderRoot;
