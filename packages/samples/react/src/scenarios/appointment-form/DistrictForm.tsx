import React, { useState } from 'react';
import { KolButton, KolForm, KolHeading, KolSelect } from '@public-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormValues } from './AppointmentForm';
import { ErrorList } from './ErrorList';

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

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus"></KolHeading>

			{sectionSubmitted && Object.keys(form.errors).length ? (
				<div className="mt-2">
					<ErrorList errors={form.errors} />
				</div>
			) : null}

			<KolForm
				_on={{
					onSubmit: () => {
						void form.submitForm();
						setSectionSubmitted(true);
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
							_error={form.errors.district}
							_touched={form.touched.district}
							_required
							_on={{
								onChange: (event, values: unknown) => {
									if (event.target) {
										const [value] = values as [FormValues['district']];
										void form.setFieldTouched('district', true);
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
