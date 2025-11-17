import { KolForm, KolHeading, KolInputNumber } from '@public-ui/react-v19';
import { Field, Formik, type FieldProps } from 'formik';
import * as React from 'react';

import { SampleDescription } from '../SampleDescription';

const WHOLE_NUMBER_ERROR = 'Please enter a whole number.';
const LEADING_ZERO_ERROR = 'Numbers with multiple digits cannot start with 0.';

type WholeNumberFormValues = {
	value?: number;
};

export function InputNumberWholeNumberFormatter() {
	const handleSubmit = async () => {};
	const initialWholeNumberValues: WholeNumberFormValues = {
		value: undefined,
	};

	return (
		<>
			<SampleDescription>
				<p>This example allows only whole numbers or an empty field. Multi-digit numbers may not start with 0.</p>
			</SampleDescription>
			<section className="w-full flex flex-col">
				<Formik<WholeNumberFormValues>
					initialValues={initialWholeNumberValues}
					validate={(values) => {
						const errors: Record<string, string> = {};
						if (typeof values.value === 'number' && !Number.isInteger(values.value)) {
							errors.value = WHOLE_NUMBER_ERROR;
						}
						return errors;
					}}
					onSubmit={handleSubmit}
				>
					{(form) => (
						<>
							<div className="p-2">
								<KolHeading _label="Whole number input" _level={2} />
								<KolForm>
									<Field name="value">
										{({ field }: FieldProps<WholeNumberFormValues['value']>) => (
											<div className="block mt-2">
												<KolInputNumber
													_label="Whole number"
													_step={1}
													_value={field.value ?? undefined}
													_msg={{
														_type: 'error',
														_description: form.errors.value || '',
													}}
													_touched={form.touched.value}
													_on={{
														onBlur: () => {
															void form.setFieldTouched('value', true);
														},
														onInput: (_, value: unknown) => {
															const rawValue =
																typeof value === 'string'
																	? value
																	: value === undefined || value === null
																		? ''
																		: String(value);
															const normalizedValue = rawValue.trim();

															if (normalizedValue === '') {
																form.setFieldError('value', undefined);
																void form.setFieldValue('value', undefined, true);
																return;
															}

															if (/^[+-]?0\d+/.test(normalizedValue)) {
																void form.setFieldTouched('value', true, false);
																form.setFieldError('value', LEADING_ZERO_ERROR);
																return;
															}

															const parsedValue = typeof value === 'number' ? value : Number(rawValue);
															if (Number.isNaN(parsedValue)) {
																form.setFieldError('value', undefined);
																void form.setFieldValue('value', undefined, true);
																return;
															}

															if (!Number.isInteger(parsedValue)) {
																void form.setFieldTouched('value', true, false);
																form.setFieldError('value', WHOLE_NUMBER_ERROR);
																return;
															}

															form.setFieldError('value', undefined);
															void form.setFieldValue('value', parsedValue, true);
													},
													}}
											/>
									</div>
								)}
							</Field>
						</KolForm>
					</div>
					<div className="p-2">
						<KolHeading _label="Model" _level={2} />
						<pre className="text-base">{JSON.stringify(form.values, null, 2)}</pre>
					</div>
				</>
				)}
			</Formik>
		</section>
		</>
	);
}
