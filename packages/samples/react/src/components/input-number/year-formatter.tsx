import { KolForm, KolHeading, KolInputNumber } from '@public-ui/react-v19';
import { Field, Formik, type FieldProps } from 'formik';
import * as React from 'react';

import { SampleDescription } from '../SampleDescription';

const WHOLE_YEAR_ERROR = 'Please enter a whole number.';

type YearExampleFormValues = {
	year?: number;
};

export function InputNumberYearFormatter() {
	const handleSubmit = async () => {};
	const currentYear = React.useMemo(() => new Date().getFullYear(), []);
	const initialYearExampleValues: YearExampleFormValues = {
		year: currentYear,
	};

	return (
		<>
			<SampleDescription>
				<p>This example limits the KolInputNumber to whole years that cannot exceed the current year.</p>
			</SampleDescription>
			<section className="w-full flex flex-col">
				<Formik<YearExampleFormValues>
					initialValues={initialYearExampleValues}
					validate={(values) => {
						const errors: Record<string, string> = {};
						if (typeof values.year !== 'number') {
							errors.year = 'Please enter a year.';
							} else if (!Number.isInteger(values.year)) {
								errors.year = WHOLE_YEAR_ERROR;
						} else if (values.year > currentYear) {
							errors.year = `The value must not exceed ${currentYear}.`;
						}
						return errors;
					}}
					onSubmit={handleSubmit}
				>
					{(form) => (
						<>
							<div className="p-2">
								<KolHeading _label="Year input (whole numbers only)" _level={2} />
								<KolForm>
									<Field name="year">
										{({ field }: FieldProps<YearExampleFormValues['year']>) => (
											<div className="block mt-2">
												<KolInputNumber
													_label="Year"
													_required
													_min={0}
													_max={currentYear}
													_step={1}
													_value={field.value ?? undefined}
													_msg={{
														_type: 'error',
														_description: form.errors.year || '',
													}}
													_touched={form.touched.year}
													_on={{
														onBlur: () => {
															void form.setFieldTouched('year', true);
														},
														onInput: (_, value: unknown) => {
															const parsedValue = typeof value === 'number' ? value : Number(value);
															if (Number.isNaN(parsedValue)) {
																void form.setFieldValue('year', undefined, true);
																return;
															}

															if (!Number.isInteger(parsedValue)) {
																void form.setFieldTouched('year', true, false);
																form.setFieldError('year', WHOLE_YEAR_ERROR);
																return;
															}

															form.setFieldError('year', undefined);
															const normalizedValue = Math.min(currentYear, Math.max(0, parsedValue));
															void form.setFieldValue('year', normalizedValue, true);
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
