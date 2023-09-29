import React from 'react';
import { KolHeading, KolInputText } from '@public-ui/react';
import { Field, FieldProps, Form, withFormik } from 'formik';
import { FormProps, FormValues } from './AppointmentForm';

export function PersonalInformationForm() {
	return (
		<>
			<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein"></KolHeading>
			<Form>
				<Field name="name">
					{({ field, form, meta }: FieldProps<FormValues['name']>) => (
						<KolInputText _label="Vor- und Zuname" _value={field.value} _on={{ onChange: field.onChange }} _name={field.name} />
					)}
				</Field>
			</Form>
		</>
	);
}
