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

type ErrorListPropType = {
	message: string;
	selector: string;
};

export function DistrictForm() {
	const form = useFormikContext<FormValues>();
	const [sectionSubmitted, setSectionSubmitted] = useState(false);

	function createErrorList(formikErros: Record<string, string>): ErrorListPropType[] {
		return Object.keys(formikErros).map((fieldName) => ({
			message: formikErros[fieldName],
			selector: `#field-${fieldName}`,
		}));
	}

	const errorList = createErrorList(form.errors);

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus"></KolHeading>
			<KolForm
				_errorMessage="Wählen Sie einen Stadtteil aus"
				_errors={errorList}
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
							_error={form.errors.district || ''}
							_touched={form.touched.district}
							_required
							_on={{
								onChange: (event, values: unknown) => {
									// Select und Radio setzen den Wert immer initial.
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
