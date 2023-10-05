import React, { useState } from 'react';
import { KolButton, KolForm, KolHeading, KolInputText, KolSelect } from '@public-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormValues } from './AppointmentForm';

const SALUTATION_OPTIONS = [
	{
		value: 'Firma',
		label: 'Firma',
	},
	{
		value: 'Frau',
		label: 'Frau',
	},
	{
		value: 'Herr',
		label: 'Herr',
	},
	{
		value: 'Hallo',
		label: 'Hallo',
	},
];

export function PersonalInformationForm() {
	const form = useFormikContext<FormValues>();
	const [sectionSubmitted, setSectionSubmitted] = useState(false);

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein"></KolHeading>
			<ul>{sectionSubmitted && Object.entries(form.errors).map(([field, error]) => <li key={field}>{error}</li>)}</ul>
			<KolForm
				_on={{
					onSubmit: () => {
						void form.submitForm();
						setSectionSubmitted(true);
					},
				}}
			>
				<Field name="salutation">
					{({ field }: FieldProps<FormValues['salutation']>) => (
						<>
							<KolSelect
								_label="Anrede"
								_value={[field.value]}
								_error={form.errors.salutation}
								_touched={form.touched.salutation}
								_options={[{ label: 'Bitte wählen…', value: '' }, ...SALUTATION_OPTIONS]}
								_on={{
									onChange: (event, values: unknown) => {
										if (event.target) {
											const [value] = values as [FormValues['salutation']];
											void form.setFieldTouched('salutation', true);
											void form.setFieldValue('salutation', value, true);
										}
									},
								}}
							/>
						</>
					)}
				</Field>

				{form.values.salutation === 'Firma' && (
					<Field name="company">
						{({ field }: FieldProps<FormValues['company']>) => (
							<>
								<KolInputText
									_label="Firma"
									_value={field.value}
									_error={form.errors.company}
									_touched={form.touched.company}
									_on={{
										onChange: (event, value: unknown) => {
											if (event.target) {
												void form.setFieldTouched('company', true);
												void form.setFieldValue('company', value, true);
											}
										},
									}}
								/>
							</>
						)}
					</Field>
				)}

				<Field name="name">
					{({ field }: FieldProps<FormValues['name']>) => (
						<>
							<KolInputText
								_label="Vor- und Zuname"
								_value={field.value}
								_error={form.errors.name}
								_touched={form.touched.name}
								_on={{
									onChange: (event, value: unknown) => {
										if (event.target) {
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
