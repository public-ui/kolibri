import { KolForm, KolHeading, KolInputNumber } from '@public-ui/react-v19';
import { Field, Formik, type FieldProps } from 'formik';
import * as React from 'react';

import { SampleDescription } from '../SampleDescription';

const WHOLE_NUMBER_ERROR = 'Please enter a whole number.';

type WholeNumberFormValues = {
	value?: number;
};

export function InputNumberYearFormatter() {
	const handleSubmit = async () => {};
	const initialWholeNumberValues: WholeNumberFormValues = {
		value: undefined,
	};

	return (
		<>
			<SampleDescription>
				<p>This example limits the KolInputNumber to whole numbers only. Empty input remains valid.</p>
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
															const parsedValue = typeof value === 'number' ? value : Number(value);
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
