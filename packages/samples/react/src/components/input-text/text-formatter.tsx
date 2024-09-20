import * as React from 'react';
import { Formik, Field, type FieldProps } from 'formik';
import { KolForm, KolHeading, KolInputText } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import { NumericFormat, type NumberFormatValues } from 'react-number-format';

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

type IbanExampleFormValues = {
	iban: string;
};

type CurrencyExampleFormValues = {
	currency: number;
};

export function InputTextFormatterDemo() {
	const handleSubmit = async () => {};
	const formatter = new IbanFormatter();

	const initialIbanExampleValues: IbanExampleFormValues = {
		iban: 'DE89370400440532013000',
	};

	const initialCurrencyExampleValues: CurrencyExampleFormValues = {
		currency: 1000000,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates formatting a data value in an input field (example IBAN). The data value is formatted to the input field (print format) and
					vice versa the formatting is removed again (machine format)
				</p>
			</SampleDescription>
			<section className="w-full flex flex-col">
				<Formik<IbanExampleFormValues> initialValues={initialIbanExampleValues} onSubmit={handleSubmit}>
					{(form) => (
						<>
							<div className="p-2">
								<KolHeading _label="Formatted Form Field" _level={2} />
								<KolForm>
									<Field name="iban">
										{({ field }: FieldProps<IbanExampleFormValues['iban']>) => (
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
								<KolHeading _label="Model" _level={2} />
								<pre className="text-base">{JSON.stringify(form.values, null, 2)}</pre>
							</div>
						</>
					)}
				</Formik>
			</section>

			<section className="w-full flex flex-col">
				<Formik<CurrencyExampleFormValues> initialValues={initialCurrencyExampleValues} onSubmit={handleSubmit}>
					{(form) => (
						<>
							<div className="p-2">
								<KolHeading _label="Formatted Form Field (with react-number-format)" _level={2} />
								<KolForm>
									<Field name="currency">
										{({ field }: FieldProps<CurrencyExampleFormValues['currency']>) => (
											<div className="block mt-2">
												<NumericFormat
													customInput={({ type, value, onBlur, onChange, onFocus, ...other }: any) => {
														console.log('OTHER: ', other);
														return <KolInputText _label="Currency" _type={type} _value={value} _on={{ onBlur, onChange, onFocus }} />;
													}}
													displayType="input"
													value={typeof field.value === 'number' ? Number(field.value).toFixed(2) : undefined}
													onBlur={() => {
														void form.setFieldTouched('currency', true);
													}}
													onValueChange={(value: NumberFormatValues) => {
														void form.setFieldValue('currency', value.floatValue, true);
													}}
													suffix={'€'}
													thousandSeparator={true}
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
