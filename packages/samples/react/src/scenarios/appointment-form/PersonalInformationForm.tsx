import { Field, useFormikContext } from 'formik';
import React, { useState, useEffect, useRef } from 'react';

import { KolButton, KolForm, KolHeading, KolInputEmail, KolInputText, KolSelect } from '@public-ui/react';

import type { FieldProps } from 'formik';
import type { FormValues } from './AppointmentForm';
import { createErrorList, focusErrorList } from './formUtils';

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
	const errorList = createErrorList(form.errors);
	const formikRef = useRef(null);

	useEffect(() => {
		focusErrorList(errorList, formikRef);
	}, [sectionSubmitted]);
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein"></KolHeading>
			<KolForm
				ref={formikRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						void form.submitForm();
						setSectionSubmitted(true);
						focusErrorList(errorList, formikRef);
					},
				}}
			>
				<Field name="salutation">
					{({ field }: FieldProps<FormValues['salutation']>) => (
						<KolSelect
							onBlur={() => {
								void form.setFieldTouched('salutation', true);
							}}
							id="field-salutation"
							_label="Anrede"
							_value={[field.value]}
							_error={form.errors.salutation || ''}
							_touched={form.touched.salutation}
							_options={[{ label: 'Bitte wählen…', value: '' }, ...SALUTATION_OPTIONS]}
							_required
							_on={{
								onChange: (event, values: unknown) => {
									if (event.target) {
										const [value] = values as [FormValues['salutation']];
										void form.setFieldValue('salutation', value, true);
									}
								},
							}}
						/>
					)}
				</Field>

				{form.values.salutation === 'Firma' && (
					<Field name="company">
						{({ field }: FieldProps<FormValues['company']>) => (
							<div className="block mt-2">
								<KolInputText
									onBlur={() => {
										void form.setFieldTouched('company', true);
									}}
									id="field-company"
									_label="Firma"
									_value={field.value}
									_error={form.errors.company || ''}
									_touched={form.touched.company}
									_required
									_on={{
										onChange: (event, value: unknown) => {
											if (event.target) {
												void form.setFieldValue('company', value, true);
											}
										},
									}}
								/>
							</div>
						)}
					</Field>
				)}

				<Field name="name">
					{({ field }: FieldProps<FormValues['name']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('name', true);
								}}
								id="field-name"
								_label="Vor- und Zuname"
								_value={field.value}
								_error={form.errors.name || ''}
								_touched={form.touched.name}
								_required
								_on={{
									onChange: (event, value: unknown) => {
										if (event.target) {
											void form.setFieldValue('name', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<Field name="email">
					{({ field }: FieldProps<FormValues['email']>) => (
						<div className="block mt-2">
							<KolInputEmail
								onBlur={() => {
									void form.setFieldTouched('email', true);
								}}
								id="field-email"
								_label="E-Mail"
								_value={field.value}
								_error={form.errors.email || ''}
								_touched={form.touched.email}
								_required
								_on={{
									onChange: (event, value: unknown) => {
										if (event.target) {
											void form.setFieldValue('email', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<Field name="phone">
					{({ field }: FieldProps<FormValues['phone']>) => (
						<div className="block mt-2">
							<KolInputText
								id="field-phone"
								_type="tel"
								_label="Telefonnumer"
								_value={field.value}
								_error={form.errors.phone || ''}
								_touched={form.touched.phone}
								_on={{
									onChange: (event, value: unknown) => {
										if (event.target) {
											void form.setFieldTouched('phone', true);
											void form.setFieldValue('phone', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
