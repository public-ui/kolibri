import { Field, useFormikContext } from 'formik';
import React, { useState, useRef, useEffect } from 'react';

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
	const errorList = createErrorList(form.errors);
	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const formikRef = useRef<HTMLKolFormElement>(null);

	useEffect(() => {
		focusErrorList(errorList, formikRef);
	}, [sectionSubmitted]);

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus"></KolHeading>
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
							onBlur={() => {
								void form.setFieldTouched('district', true);
							}}
							_on={{
								onChange: (event, values: unknown) => {
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
