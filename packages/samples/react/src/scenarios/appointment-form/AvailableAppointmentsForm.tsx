import { Field, useFormikContext } from 'formik';
import React, { useEffect, useState, useRef, useCallback } from 'react';

import { KolButton, KolForm, KolHeading, KolInputDate, KolInputRadio, KolSpin } from '@public-ui/react';

import { fetchAvailableTimes } from './appointmentService';

import type { FormValues } from './AppointmentForm';
import type { FieldProps, FieldInputProps } from 'formik';
import type { Option } from '@public-ui/components';
import { createErrorList, focusErrorList } from './formUtils';

export function AvailableAppointmentsForm() {
	const form = useFormikContext<FormValues>();

	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const [availableTimes, setAvailableTimes] = useState<Option<string>[] | null>(null);
	const [schouldFocusErrorList, setSchouldFocusErrorList] = useState(true);
	const errorList = createErrorList(form.errors);
	const formikRef = useRef(null);

	useEffect(() => {
		let ignoreResponse = false;
		setAvailableTimes(null);
		if (schouldFocusErrorList && sectionSubmitted) {
			focusErrorList(formikRef);
			setSchouldFocusErrorList(false);
		}

		if (form.values.date) {
			fetchAvailableTimes().then(
				(times) => {
					if (!ignoreResponse) {
						setAvailableTimes(times);
						void form.setFieldValue('time', times[0].value);
						void form.setFieldTouched('time');
					}
				},
				() => {},
			); // ignore errors
		}
		return () => {
			ignoreResponse = true;
		};
	}, [form.values.date, sectionSubmitted]);

	const renderField = useCallback(
		(name: string, node: (field: FieldInputProps<FormValues['date' | 'time']>) => void) => (
			<Field name={name}>{({ field }: FieldProps<FormValues['date' | 'time']>) => node(field)}</Field>
		),
		[],
	);

	const handleField = useCallback(
		(name: string) => ({
			onChange: (event: Event, value: unknown): void => {
				if (event.target) {
					void form.setFieldValue(name, value, true);
				}
			},
			onBlur: () => {
				void form.setFieldTouched(name, true);
			},
		}),
		[form.setFieldValue, form.setFieldTouched],
	);
	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Termin aus"></KolHeading>
			<KolForm
				ref={formikRef}
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						setSectionSubmitted(true);
						void form.submitForm();
						focusErrorList(formikRef);
					},
				}}
			>
				{renderField('date', (field) => (
					<KolInputDate
						id="field-date"
						_label="Datum"
						_value={field.value}
						_msg={{
							_type: 'error',
							_description: form.errors.date || '',
						}}
						_touched={form.touched.date}
						_required
						_on={handleField('date')}
					/>
				))}

				{form.values.date && (
					<div className="grid gap-4 mt-4">
						{availableTimes ? (
							<>
								{renderField('time', (field) => (
									<KolInputRadio
										id="field-time"
										_label="Zeit"
										_orientation="horizontal"
										_options={availableTimes}
										_value={field.value}
										_msg={{
											_type: 'error',
											_description: form.errors.time || '',
										}}
										_touched={form.touched.time}
										_required
										_on={handleField('time')}
									/>
								))}
								<p>
									<em>Aus Testzwecken sind nur die Termine zu jeder halben Stunde verfügbar.</em>
								</p>
							</>
						) : (
							<KolSpin _show className="block" aria-label="Termine werden geladen." _variant="cycle" />
						)}
					</div>
				)}

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
				{form.values.date && form.isValidating ? <KolSpin _show aria-label="Termin wird geprüft." /> : ''}
			</KolForm>
		</div>
	);
}
