import { KolInputEmailController, KolInputTextController, KolSelectController } from '@public-ui/react-hook-form-adapter';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { KolButton, KolForm, KolHeading } from '@public-ui/react-v19';

import type { FormFieldName, FormValues } from './AppointmentForm';
import { createErrorList, focusErrorList, touchFields } from './formUtils';

type Props = {
	fieldsToValidate: FormFieldName[];
	onComplete: () => void;
};

const SALUTATION_OPTIONS = [
	{
		value: 'Company',
		label: 'Company',
	},
	{
		value: 'Mrs.',
		label: 'Mrs.',
	},
	{
		value: 'Mr.',
		label: 'Mr.',
	},
	{
		value: 'Hello',
		label: 'Hello',
	},
];

export function PersonalInformationForm({ fieldsToValidate, onComplete }: Props) {
	const {
		clearErrors,
		control,
		formState: { errors },
		getValues,
		setValue,
		trigger,
		watch,
	} = useFormContext<FormValues>();
	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const errorList = createErrorList<FormValues>(errors, fieldsToValidate);
	const formRef = useRef<HTMLKolFormElement>(null);
	const salutation = watch('salutation');

	useEffect(() => {
		focusErrorList(formRef);
	}, [sectionSubmitted]);

	const fieldsForValidation = salutation === 'Company' ? fieldsToValidate : fieldsToValidate.filter((field) => field !== 'company');

	const handleSubmit = async () => {
		setSectionSubmitted(true);
		touchFields<FormValues>(fieldsForValidation, getValues, setValue);
		const isValid = await trigger(fieldsForValidation, { shouldFocus: true });
		if (isValid) {
			onComplete();
		} else {
			focusErrorList(formRef);
		}
	};
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Enter your contact details"></KolHeading>
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
					name="salutation"
					id="field-salutation"
					_label="Salutation"
					_options={[{ label: 'Please select…', value: '' }, ...SALUTATION_OPTIONS]}
					_required
					_on={{
						onChange: () => {
							setSectionSubmitted(false);
							clearErrors(fieldsToValidate);
						},
					}}
				/>

				{salutation === 'Company' && (
					<div className="block mt-2">
						<KolInputTextController
							control={control}
							name="company"
							id="field-company"
							_label="Company"
							_required
							_on={{
								onChange: () => {
									setSectionSubmitted(false);
									clearErrors(fieldsToValidate);
								},
							}}
						/>
					</div>
				)}

				<div className="block mt-2">
					<KolInputTextController
						control={control}
						name="name"
						id="field-name"
						_label="First name and surname"
						_required
						_on={{
							onChange: () => {
								setSectionSubmitted(false);
								clearErrors(fieldsToValidate);
							},
						}}
					/>
				</div>

				<div className="block mt-2">
					<KolInputEmailController
						control={control}
						name="email"
						id="field-email"
						_label="E-Mail"
						_required
						_on={{
							onChange: () => {
								setSectionSubmitted(false);
								clearErrors(fieldsToValidate);
							},
						}}
					/>
				</div>

				<div className="block mt-2">
					<KolInputTextController
						control={control}
						name="phone"
						id="field-phone"
						_type="tel"
						_label="Telephone number"
						_on={{
							onChange: () => {
								setSectionSubmitted(false);
								clearErrors('phone');
							},
						}}
					/>
				</div>

				<KolButton _label="Next" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}
