import { Field, useFormikContext } from 'formik';
import React, { useState, useRef } from 'react';

import { KolButton, KolForm, KolHeading, KolSelect } from '@public-ui/react';

import type { FieldProps } from 'formik';
import type { FormValues } from './AppointmentForm';
import { createErrorList, focusErrorList } from './formUtils';

const LOCATION_OPTIONS = [
	{
		value: 'Aplerbeck',
		label: 'Aplerbeck',
	},
	{
		value: 'Brackel',
		label: 'Brackel',
	},
	{
		value: 'Dorstfeld',
		label: 'Dorstfeld',
	},
	{
		value: 'Downtown East',
		label: 'downtown East',
	},
	{
		value: 'Downtown West',
		label: 'downtown West',
	},
];

export function DistrictForm() {
	const form = useFormikContext<FormValues>();
	const errorList = createErrorList(form.errors);
	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const formikRef = useRef<HTMLKolFormElement>(null);
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Select a district"></KolHeading>
			<KolForm
				ref={formikRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						setSectionSubmitted(true);
						form
							.validateForm()
							.then((res) => {
								if (res && Object.keys(res).length > 0) throw Error();
								void form.submitForm();
							})
							.catch(() => {
								focusErrorList(formikRef);
							});
					},
				}}
			>
				<Field name="district">
					{({ field }: FieldProps<FormValues['district']>) => (
						<KolSelect
							id="field-district"
							_label="District"
							_options={[{ label: 'Please select…', value: '' }, ...LOCATION_OPTIONS]}
							_value={[field.value]}
							_msg={{
								_type: 'error',
								_description: form.errors.district || '',
							}}
							_touched={form.touched.district}
							_required
							onBlur={() => {
								void form.setFieldTouched('district', true);
							}}
							_on={{
								onChange: (event, values: unknown) => {
									setSectionSubmitted(false);
									// Select und Radio setzen den Wert immer initial.
									if (event.target) {
										const [value] = values as [FormValues['district']];
										void form.setFieldValue('district', value, true);
									}
								},
							}}
						/>
					)}
				</Field>

				<KolButton _label="Next" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
