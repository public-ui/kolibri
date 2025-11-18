import { KolForm, KolHeading, KolInputNumber } from '@public-ui/react-v19';
import { Field, Formik, type FieldProps } from 'formik';
import * as React from 'react';

import { SampleDescription } from '../SampleDescription';

class WholeNumberFormatter {
	public parse(value: unknown): string {
		if (value === undefined || value === null || value === '') {
			return '';
		}

		const stringValue = String(value);
		// Entferne alle ungültigen Zeichen: e, E, . und ,
		return stringValue.replace(/[eE.,]/g, '');
	}
}

type WholeNumberFormValues = {
	value?: number;
};

export function InputNumberWholeNumberFormatter() {
	const handleSubmit = async () => {};
	const formatter = new WholeNumberFormatter();
	const [displayValue, setDisplayValue] = React.useState<number | undefined>(undefined);

	const initialWholeNumberValues: WholeNumberFormValues = {
		value: undefined,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates formatting number input to whole numbers. Decimal separators (. and ,) and scientific notation (e) are automatically removed
					on input.
				</p>
			</SampleDescription>
			<section className="w-full flex flex-col">
				<Formik<WholeNumberFormValues> initialValues={initialWholeNumberValues} onSubmit={handleSubmit}>
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
													_value={displayValue ?? field.value}
													_on={{
														onBlur: () => {
															void form.setFieldTouched('value', true);
														},
														onInput: (_, value: unknown) => {
															const cleaned = formatter.parse(value);
															const numValue = cleaned === '' ? undefined : Number(cleaned);

															setDisplayValue(numValue);
															void form.setFieldValue('value', numValue, true);
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
