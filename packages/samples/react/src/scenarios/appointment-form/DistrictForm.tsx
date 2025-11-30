import { KolSelectController } from '@public-ui/react-hook-form-adapter';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { KolButton, KolForm, KolHeading } from '@public-ui/react-v19';

import type { FormFieldName, FormValues } from './AppointmentForm';
import { createErrorList, focusErrorList, touchFields } from './formUtils';

type Props = {
	fieldsToValidate: FormFieldName[];
	onComplete: () => void;
};

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

export function DistrictForm({ fieldsToValidate, onComplete }: Props) {
	const {
		clearErrors,
		control,
		formState: { errors },
		getValues,
		setValue,
		trigger,
	} = useFormContext<FormValues>();
	const errorList = createErrorList<FormValues>(errors, fieldsToValidate);
	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const formRef = useRef<HTMLKolFormElement>(null);

	const handleSubmit = async () => {
		setSectionSubmitted(true);
		touchFields<FormValues>(fieldsToValidate, getValues, setValue);
		const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
		if (isValid) {
			setSectionSubmitted(false);
			onComplete();
		} else {
			focusErrorList(formRef);
		}
	};
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Select a district"></KolHeading>
			<KolForm
				ref={formRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						void handleSubmit();
					},
				}}
			>
				<KolSelectController
					control={control}
					name="district"
					id="field-district"
					_label="District"
					_options={[{ label: 'Please select…', value: '' }, ...LOCATION_OPTIONS]}
					_required
					_on={{
						onChange: () => {
							setSectionSubmitted(false);
							clearErrors(fieldsToValidate);
						},
					}}
				/>

				<KolButton _label="Next" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
