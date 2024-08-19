import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field, type FieldProps /*, type FormikHelpers */ } from 'formik';
import { KolForm, KolInputText } from '@public-ui/react';

const NON_ALPHANUM = /[^a-zA-Z0-9]/g;
const EVERY_FOUR_CHARS = /(.{4})(?!$)/g;

class IbanSpecification {
	private _cachedRegex: RegExp | undefined;

	public constructor(
		public readonly countryCode: string,
		public readonly length: number,
		private readonly structure: string,
		public readonly example: string,
	) {}

	private parseStructure(structure: string): RegExp {
		// split in blocks of 3 chars
		const regex = structure.match(/(.{3})/g)?.map((block) => {
			let format;
			const pattern = block.slice(0, 1);
			const repeats = parseInt(block.slice(1), 10);

			switch (pattern) {
				case 'A':
					format = '0-9A-Za-z';
					break;
				case 'B':
					format = '0-9A-Z';
					break;
				case 'C':
					format = 'A-Za-z';
					break;
				case 'F':
					format = '0-9';
					break;
				case 'L':
					format = 'a-z';
					break;
				case 'U':
					format = 'A-Z';
					break;
				case 'W':
					format = '0-9a-z';
					break;
			}

			return '([' + format + ']{' + repeats + '})';
		});

		return new RegExp('^' + regex?.join('') + '$');
	}

	public iso13616Prepare(iban: string): string {
		const A = 'A'.charCodeAt(0);
		const Z = 'Z'.charCodeAt(0);
		let ibanLocal = iban.toUpperCase();
		ibanLocal = ibanLocal.substr(4) + ibanLocal.substr(0, 4);

		return ibanLocal
			.split('')
			.map((n) => {
				const code = n.charCodeAt(0);
				if (code >= A && code <= Z) {
					// A = 10, B = 11, ... Z = 35
					return code - A + 10;
				} else {
					return n;
				}
			})
			.join('');
	}

	public iso7064Mod97_10(iban: string): Number {
		let remainder = iban;
		let block;

		while (remainder.length > 2) {
			block = remainder.slice(0, 9);
			remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
		}

		return parseInt(remainder, 10) % 97;
	}

	public regex() {
		return this._cachedRegex || (this._cachedRegex = this.parseStructure(this.structure));
	}

	public isValid(iban: string): boolean {
		return (
			this.length == iban.length &&
			this.countryCode === iban.slice(0, 2) &&
			this.regex().test(iban.slice(4)) &&
			this.iso7064Mod97_10(this.iso13616Prepare(iban)) == 1
		);
	}

	public printFormat(iban: string, separator?: string): string {
		return this.electronicFormat(iban).replace(EVERY_FOUR_CHARS, '$1' + (separator || ' '));
	}

	public electronicFormat(iban: string): string {
		return iban.replace(NON_ALPHANUM, '').toUpperCase();
	}
}

const ibanSpecifications: Record<string, IbanSpecification> = {};

function addSpecification(countryCode: string, length: number, structure: string, example: string) {
	ibanSpecifications[countryCode] = new IbanSpecification(countryCode, length, structure, example);
}

addSpecification('AT', 20, 'F05F11', 'AT611904300234573201');
addSpecification('CZ', 24, 'F04F06F10', 'CZ6508000000192000145399');
addSpecification('DE', 22, 'F08F10', 'DE89370400440532013000');
addSpecification('DK', 18, 'F04F09F01', 'DK5000400440116243');

type Formatter<T = string> = {
	format: (value: T) => string;
	parse: (value: string) => T;
};

type FormValues = {
	iban: string;
	iban2: string;
	currencyTest: number;
};

type InputFormattedFieldProps<T = any> = {
	id: string;
	fieldKey: string;
	label: string;
	required?: boolean;
	formatter?: Formatter<T>;
};

const defaultFormatter: Formatter = {
	format: (v) => v,
	parse: (v) => v,
};

const ibanFormatter: (config?: any) => Formatter = () => {
	const getIbanSpecification = (iban: string) => {
		const countryCode = iban.slice(0, 2);
		return ibanSpecifications[countryCode];
	};

	return {
		parse: (value: string) => {
			return getIbanSpecification(value)?.electronicFormat(value) || value;
		},
		format: (value: string) => {
			return getIbanSpecification(value)?.printFormat(value) || value;
		},
	};
};

const currencyFormatter: (config?: { locale?: string; currency?: string }) => Formatter<number> = ({ locale = 'de-DE', currency = 'EUR' } = {}) => {
	const numberFormatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	});

	return {
		format: (value: number) => {
			return numberFormatter.format(value);
		},
		parse: (value: string) => {
			const rawValue = parseInt(value.replace(/\D/g, ''), 10) || 0;

			return rawValue / 100;
		},
	};
};

const initialValues: FormValues = {
	iban: ibanSpecifications['DE'].example,
	iban2: 'DE45',
	currencyTest: 5.4,
};

declare module 'yup' {
	interface StringSchema {
		iban(message: string): StringSchema;
	}
}

Yup.addMethod(Yup.string, 'iban', function (errorMessage) {
	return this.test(`test-iban-value`, errorMessage, function (value) {
		const { path, createError } = this;

		if (value) {
			const countryCode = value.slice(0, 2);
			const specification = ibanSpecifications[countryCode];

			if (!specification) {
				return createError({ path, message: errorMessage + ' (country code not supported)' });
			}

			if (specification.isValid(value)) {
				return true;
			}

			if (value.length < specification.length) {
				return createError({ path, message: errorMessage + ' (too short)' });
			}

			if (value.length > specification.length) {
				return createError({ path, message: errorMessage + ' (too long)' });
			}

			if (specification.iso7064Mod97_10(specification.iso13616Prepare(value)) !== 1) {
				return createError({ path, message: errorMessage + ' (incorrect check digit)' });
			}
		}

		return createError({ path, message: errorMessage });
	});
});

const validationSchema = Yup.object().shape({
	iban: Yup.string().optional().iban('Invalid IBAN'),
	iban2: Yup.string().optional().iban('Invalid IBAN'),
	currentTest: Yup.number(),
});

function InputTextFormattedField({ id, required = false, fieldKey, label, formatter = defaultFormatter }: InputFormattedFieldProps) {
	return (
		<Field name={fieldKey}>
			{({ field, form }: FieldProps) => {
				return (
					<KolInputText
						id={id}
						_label={label}
						onBlur={() => {
							void form.setFieldTouched(fieldKey, true);
						}}
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						_value={formatter.format(field.value[fieldKey] ?? '')}
						_msg={{
							_type: 'error',
							_description: (form.errors[fieldKey] as string) || '',
						}}
						_touched={Boolean(form.touched[fieldKey])}
						_required={required}
						_on={{
							onChange: (event, value: unknown) => {
								if (event.target) {
									void form.setFieldValue(fieldKey, formatter.parse((value as string) ?? ''), true);
								}
							},
						}}
					/>
				);
			}}
		</Field>
	);
}

export function InputTextFormatterDemo() {
	const handleSubmit = async (/*_values: FormValues, formik: FormikHelpers<FormValues>*/) => {};

	const fieldDefs: InputFormattedFieldProps[] = [
		{ id: 'field-iban', label: 'IBAN', fieldKey: 'iban', formatter: ibanFormatter({}) },
		{ id: 'field-iban2', label: 'IBAN 2', fieldKey: 'iban2', formatter: ibanFormatter({}) },
		{ id: 'field.currency-test', label: 'Currency Test', fieldKey: 'currencyTest', formatter: currencyFormatter({}) },
	];

	return (
		<Formik<FormValues> validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
			<div className="p-2">
				<KolForm>
					{fieldDefs.map((fieldProps) => (
						<div key={fieldProps.id} className="block mt-2">
							<InputTextFormattedField {...fieldProps} />
						</div>
					))}
				</KolForm>
			</div>
		</Formik>
	);
}
