import React from 'react';
import { KolButton, KolForm, KolHeading, KolInputText } from '@public-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormValues } from './AppointmentForm';

export function PersonalInformationForm() {
	const form = useFormikContext<FormValues>();

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein"></KolHeading>
			<ul>
				{Object.entries(form.errors).map(([field, error]) => (
					<li key={field}>{error}</li>
				))}
			</ul>
			<KolForm
				_on={{
					onSubmit: () => {
						void form.submitForm();
					},
				}}
			>
				<Field name="name">
					{({ field }: FieldProps<FormValues['name']>) => (
						<>
							<KolInputText
								_label="Vor- und Zuname"
								_value={field.value}
								_error={form.errors.name}
								_touched={form.touched.name}
								_on={{
									onChange: (event, values: unknown) => {
										if (event.target) {
											const [value] = values as [FormValues['name']];
											void form.setFieldTouched('name', true);
											void form.setFieldValue('name', value, true);
										}
									},
								}}
							/>
						</>
					)}
				</Field>

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
