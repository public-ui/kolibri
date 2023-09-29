import React from 'react';
import { KolButton, KolForm, KolHeading, KolSelect } from '@public-ui/react';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormValues } from './AppointmentForm';
import { EventCallback } from '@public-ui/components/src/types/callbacks';

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

export type DistrictFormProps = {
	onSubmit: EventCallback<Event>;
};
export function DistrictForm({ onSubmit }: DistrictFormProps) {
	const form = useFormikContext<FormValues>();

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus"></KolHeading>
			is validating? {String(form.isValidating)}
			<KolForm _on={{ onSubmit }}>
				<Field name="district">
					{({ field }: FieldProps<FormValues['district']>) => (
						<>
							<KolSelect
								_label="Stadtteil"
								_options={[{ label: 'Bitte wählen…', value: '', disabled: true }, ...LOCATION_OPTIONS]}
								_value={[field.value]}
								_on={{
									onChange: (event, values: unknown) => {
										if (event.target) {
											const [value] = values as [FormValues['district']];
											void form.setFieldValue('district', value);
											void form.setTouched({ district: true });
										}
									},
								}}
								_error={form.errors.district}
								_touched={form.touched.district}
							/>
						</>
					)}
				</Field>

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
