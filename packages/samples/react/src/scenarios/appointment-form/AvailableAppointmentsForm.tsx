import { KolInputDateController, KolInputRadioController } from '@public-ui/react-hook-form-adapter';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { KolButton, KolForm, KolHeading, KolSpin } from '@public-ui/react-v19';

import { fetchAvailableTimes } from './appointmentService';

import type { Option } from '@public-ui/components';
import type { FormFieldName, FormValues } from './AppointmentForm';
import { createErrorList, focusErrorList, touchFields } from './formUtils';

type Props = {
	fieldsToValidate: FormFieldName[];
	onComplete: () => void;
};

export function AvailableAppointmentsForm({ fieldsToValidate, onComplete }: Props) {
	const {
		clearErrors,
		control,
		formState: { errors, isValidating },
		getValues,
		setValue,
		trigger,
		watch,
	} = useFormContext<FormValues>();

	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const [availableTimes, setAvailableTimes] = useState<Option<string>[] | null>(null);
	const [shouldFocusErrorList, setShouldFocusErrorList] = useState(true);
	const errorList = createErrorList<FormValues>(errors, fieldsToValidate);
	const formRef = useRef<HTMLKolFormElement>(null);

	const date = watch('date');

	useEffect(() => {
		let ignoreResponse = false;
		setAvailableTimes(null);
		if (shouldFocusErrorList && sectionSubmitted) {
			focusErrorList(formRef);
			setShouldFocusErrorList(false);
		}

		if (date) {
			fetchAvailableTimes().then(
				(times) => {
					if (!ignoreResponse) {
						setAvailableTimes(times);
						const [firstTime] = times;
						const firstTimeValue = (firstTime as { value?: unknown } | undefined)?.value;
						if (typeof firstTimeValue === 'string') {
							setValue('time', firstTimeValue as FormValues['time'], { shouldValidate: true, shouldTouch: true });
							clearErrors('time');
						}
					}
				},
				() => {},
			);
		}
		return () => {
			ignoreResponse = true;
		};
	}, [clearErrors, date, sectionSubmitted, setValue, shouldFocusErrorList]);

	const handleSubmit = async () => {
		setSectionSubmitted(true);
		touchFields<FormValues>(fieldsToValidate, getValues, setValue);
		const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
		if (isValid) {
			setShouldFocusErrorList(true);
			onComplete();
		} else {
			focusErrorList(formRef);
		}
	};
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Select an appointment"></KolHeading>
			<KolForm
				ref={formRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						void handleSubmit();
					},
				}}
			>
				<KolInputDateController
					control={control}
					name="date"
					id="field-date"
					_label="Date"
					_required
					_on={{
						onChange: () => {
							setSectionSubmitted(false);
							setShouldFocusErrorList(true);
							clearErrors('date');
						},
					}}
				/>

				{date && (
					<div className="grid gap-4 mt-4">
						{availableTimes ? (
							<>
								<KolInputRadioController
									control={control}
									name="time"
									id="field-time"
									_label="Time"
									_orientation="horizontal"
									_options={availableTimes}
									_required
									_on={{
										onChange: () => {
											setSectionSubmitted(false);
											setShouldFocusErrorList(true);
											clearErrors('time');
										},
									}}
								/>
								<p>
									<em>For test purposes, only the dates for every half hour are available.</em>
								</p>
							</>
						) : (
							<KolSpin _show className="block" aria-label="Dates are loaded." _variant="cycle" />
						)}
					</div>
				)}

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
				{date && isValidating ? <KolSpin _show aria-label="Date being checked." /> : ''}
			</KolForm>
		</div>
	);
}
