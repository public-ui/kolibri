import React, { useState, useRef } from 'react';
import { KolButton, KolForm, KolHeading, KolSelect } from '@public-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormValues } from './AppointmentForm';
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
		value: 'Innenstadt Ost',
		label: 'Innenstadt Ost',
	},
	{
		value: 'Innenstadt West',
		label: 'Innenstadt West',
	},
];

export function DistrictForm() {
	const form = useFormikContext<FormValues>();
	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const errorList = createErrorList(form.errors);
	const formikRef = useRef<HTMLKolFormElement>(null);
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus"></KolHeading>
			<KolForm
				ref={formikRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						setSectionSubmitted(true);
						form.validateForm().then((res) => {
							if (res && Object.keys(res).length > 0) throw Error();
							form.submitForm();
						}).catch(() => {
							focusErrorList(formikRef);
						});
					},
				}}
			>
				<Field name="district">
					{({ field }: FieldProps<FormValues['district']>) => (
						<KolSelect
							id="field-district"
							_label="Stadtteil"
							_options={[{ label: 'Bitte wählen…', value: '' }, ...LOCATION_OPTIONS]}
							_value={[field.value]}
							_error={form.errors.district || ''}
							_touched={form.touched.district}
							_required
							_on={{
								onBlur: () => {
									void form.setFieldTouched('district', true);
								},
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

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
