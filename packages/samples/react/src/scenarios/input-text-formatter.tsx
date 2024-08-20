import * as React from 'react';
import { Formik, Field, type FieldProps } from 'formik';
import { KolForm, KolInputText } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

const NON_ALPHANUM = /[^a-zA-Z0-9]/g;
const EVERY_FOUR_CHARS = /(.{4})(?!$)/g;

class IbanFormatter {
	private electronicFormat(iban: string): string {
		return iban.replace(NON_ALPHANUM, '').toUpperCase();
	}

	private printFormat(iban: string, separator?: string) {
		return this.electronicFormat(iban).replace(EVERY_FOUR_CHARS, '$1' + (separator || ' '));
	}

	public parse(value: string): string {
		return this.electronicFormat(value);
	}
	public format(value: string): string {
		return this.printFormat(value);
	}
}

type FormValues = {
	iban: string;
};

export function InputTextFormatterDemo() {
	const handleSubmit = async () => {};
	const formatter = new IbanFormatter();
	const initialValues: FormValues = {
		iban: 'DE89370400440532013000',
	};

	return (
		<>
			<SampleDescription>
				<p>This example demonstrates a text field with formatting</p>
			</SampleDescription>
			<Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit}>
				{(form) => (
					<>
						<div className="p-2">
							<KolForm>
								<Field name="iban">
									{({ field }: FieldProps<FormValues['iban']>) => (
										<div className="block mt-2">
											<KolInputText
												onBlur={() => {
													void form.setFieldTouched('iban', true);
												}}
												id="field-iban"
												_label="IBAN"
												_value={formatter.format(field.value ?? '')}
												_msg={{
													_type: 'error',
													_description: form.errors.iban || '',
												}}
												_touched={form.touched.iban}
												_required
												_on={{
													onInput: (event, value: unknown) => {
														if (event.target) {
															const parsed_value = formatter.parse((value as string) ?? '');

															void form.setFieldValue('iban', parsed_value, true);
														}
													},
												}}
											/>
										</div>
									)}
								</Field>
							</KolForm>
						</div>
						<div className="p-2">
							<pre>{JSON.stringify(form.values)}</pre>
						</div>
					</>
				)}
			</Formik>
		</>
	);
}
