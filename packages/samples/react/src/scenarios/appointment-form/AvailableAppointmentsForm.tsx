import React, { useEffect, useState } from 'react';
import { KolButton, KolForm, KolHeading, KolInputDate, KolInputRadio, KolSpin } from '@public-ui/react';
import { FormValues } from './AppointmentForm';
import { Field, FieldProps, useFormikContext } from 'formik';
import { fetchAvailableTimes } from './appointmentService';
import { Option } from '@public-ui/components/src';
import { createErrorList } from './formUtils';

export function AvailableAppointmentsForm() {
	const form = useFormikContext<FormValues>();

	const [sectionSubmitted, setSectionSubmitted] = useState(false);
	const [availableTimes, setAvailableTimes] = useState<Option<string>[] | null>(null);
	const errorList = createErrorList(form.errors);

	useEffect(() => {
		let ignoreResponse = false;
		setAvailableTimes(null);

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
	}, [form.values.date]);

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Wählen Sie einen Termin aus"></KolHeading>
			<KolForm
				_errorList={sectionSubmitted ? errorList : []}
				_on={{
					onSubmit: () => {
						void form.submitForm();
						setSectionSubmitted(true);
					},
				}}
			>
				<Field name="date">
					{({ field }: FieldProps<FormValues['date']>) => (
						<KolInputDate
							id="field-date"
							_label="Datum"
							_value={field.value}
							_error={form.errors.date || ''}
							_touched={form.touched.date}
							_required
							_on={{
								onChange: (event: Event, value: unknown): void => {
									if (event.target) {
										void form.setFieldValue('date', value, true);
									}
								},
								onBlur: () => {
									void form.setFieldTouched('date', true);
								},
							}}
						/>
					)}
				</Field>

				{form.values.date && (
					<div className="grid gap-4 mt-4">
						{availableTimes ? (
							<>
								<Field name="time">
									{({ field }: FieldProps<FormValues['time']>) => (
										<KolInputRadio
											id="field-time"
											_label="Zeit"
											_orientation="horizontal"
											_options={availableTimes}
											_value={field.value}
											_error={form.errors.time || ''}
											_touched={form.touched.time}
											_required
											_on={{
												onChange: (event: Event, value: unknown): void => {
													if (event.target) {
														void form.setFieldTouched('time', true);
														void form.setFieldValue('time', value, true);
													}
												},
											}}
										/>
									)}
								</Field>
								<p>
									<em>Aus Testzwecken sind nur die Termine zu jeder halben Stunde verfügbar.</em>
								</p>
							</>
						) : (
							<KolSpin _show className="block" aria-label="Termine werden geladen." _variant="cycle" />
						)}
					</div>
				)}

				<KolButton _label="Weiter" _type="submit" className="mt-2" _disabled={form.isValidating} />
				{form.values.date && form.isValidating ? <KolSpin _show aria-label="Termin wird geprüft." /> : ''}
			</KolForm>
		</div>
	);
}
