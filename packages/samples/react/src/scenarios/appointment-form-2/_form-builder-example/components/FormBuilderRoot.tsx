import * as React from 'react';
import { CustomFieldProvider, DataQueryProvider, FormBuilderProvider, SchemaValidationProvider } from '../providers';
import { FormBuilder } from './builders';
import type { FormBuilderSettingsType } from '../types';

export type FormBuilderRootProps<T extends object> = {
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
