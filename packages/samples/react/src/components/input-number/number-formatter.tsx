import { KolForm, KolInputNumber, KolInputText } from '@public-ui/react-v19';
import React, { type BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat, type NumberFormatValues, type NumericFormatProps } from 'react-number-format';

import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

type KolInputTextEvents = {
	onBlur?: (event: Event) => void;
	onChange?: (event: Event, value: unknown) => void;
	onFocus?: (event: Event) => void;
	onInput?: (event: Event, value: unknown) => void;
};

class NumberFormatter {
	public parse(value: unknown): string {
		if (value === undefined || value === null || value === '') {
			return '';
		}

		const stringValue = String(value);
		return stringValue.replace(/[eE.,]/g, '').replace(/\d[+-]/g, '');
	}
}

const disallowedCharactersPattern = /[.,+eE]/;

const preventInvalidKeyDown = (event: KeyboardEvent) => {
	if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && disallowedCharactersPattern.test(event.key)) {
		event.preventDefault();
	}
};

type KolNumericFormatControllerProps = {
	_label: string;
	_msg?: React.ComponentProps<typeof KolInputText>['_msg'];
	_touched?: boolean;
	_on?: React.ComponentProps<typeof KolInputText>['_on'];
	_required?: boolean;
	value?: number;
} & Omit<NumericFormatProps, 'customInput' | 'value' | 'onBlur' | 'onValueChange'>;

function KolNumericFormat({
	_label,
	_msg,
	_touched,
	_on,
	_required,
	value,
	thousandSeparator = true,
	suffix = '€',
	...props
}: KolNumericFormatControllerProps) {
	const normalizedOn = _on && typeof _on === 'object' ? (_on as KolInputTextEvents) : undefined;

	return (
		<NumericFormat
			{...(props as any)}
			value={value}
			suffix={suffix}
			thousandSeparator={thousandSeparator}
			valueIsNumericString={false}
			customInput={(inputProps: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const inputValue = inputProps.value;
				return (
					<KolInputText
						{...inputProps}
						_value={inputValue}
						_label={_label}
						_msg={_msg}
						_touched={_touched}
						_required={_required}
						_on={{
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							onBlur: inputProps.onBlur as ((event: Event) => void) | undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							onChange: inputProps.onChange as ((event: Event, value: unknown) => void) | undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							onFocus: inputProps.onFocus as ((event: Event) => void) | undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							onInput: inputProps.onInput as ((event: Event, value: unknown) => void) | undefined,
						}}
					/>
				);
			}}
			onValueChange={(numericValue: NumberFormatValues) => {
				const fakeEvent = new Event('input');
				normalizedOn?.onInput?.(fakeEvent, numericValue.floatValue);
			}}
			onBlur={(event) => {
				normalizedOn?.onBlur?.(event.nativeEvent);
			}}
		/>
	);
}

function KolNumericFormatController(props: any) {
	const { name, control, rules, defaultValue, shouldUnregister, disabled, _label, _required, ...componentProps } = props;
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			shouldUnregister={shouldUnregister}
			disabled={disabled}
			render={({ field, fieldState }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const userHandlers = componentProps._on as KolInputTextEvents | undefined;
				return (
					<KolNumericFormat
						{...(componentProps as any)}
						_label={_label}
						_required={_required}
						value={field.value}
						_touched={fieldState.isTouched}
						_msg={
							fieldState.error
								? {
										_type: 'error' as const,
										_description: fieldState.error.message || String(fieldState.error),
									}
								: undefined
						}
						_on={{
							onInput: (event: Event, value: unknown) => {
								field.onChange(value);
								userHandlers?.onInput?.(event, value);
							},
							onBlur: () => field.onBlur(),
						}}
					/>
				);
			}}
		/>
	);
}

type CurrencyExampleFormValues = {
	currency: number;
};

export function InputNumberNumberFormatter() {
	const formatter = new NumberFormatter();
	const [displayValue, setDisplayValue] = React.useState<number | undefined>(undefined);
	const [value, setValue] = React.useState<number | undefined>(-128);
	const [touched, setTouched] = React.useState(false);

	const initialCurrencyExampleValues: CurrencyExampleFormValues = {
		currency: 1000000,
	};

	const currencyForm = useForm<CurrencyExampleFormValues>({
		defaultValues: initialCurrencyExampleValues,
		mode: 'onTouched',
	});

	const currencyValues = currencyForm.watch();

	const handleCurrencySubmit = (event: Event) => {
		void currencyForm.handleSubmit(async () => {})(event as unknown as BaseSyntheticEvent);
	};

	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates formatting number input. The first example shows whole number formatting where decimal separators (. and ,) and scientific
					notation (e) are automatically removed on input. The second example shows currency formatting with react-number-format in a react-hook-form context.
				</p>
			</SampleDescription>
			<section className="w-full grid gap-4">
				<SampleBlock id="whole-number">
					<KolForm>
						<KolInputNumber
							_label="Whole number"
							_step={1}
							_value={displayValue ?? value}
							_on={{
								onKeyDown: preventInvalidKeyDown,
								onBlur: () => {
									setTouched(true);
								},
								onInput: (_event: Event, inputValue: unknown) => {
									const cleaned = formatter.parse(inputValue);
									const numValue = cleaned === '' ? undefined : Number(cleaned);

									setDisplayValue(numValue);
									setValue(numValue);
								},
							}}
						/>
					</KolForm>
					<pre className="text-base mt-2">{JSON.stringify({ value, touched }, null, 2)}</pre>
				</SampleBlock>

				<SampleBlock id="currency">
					<KolForm _on={{ onSubmit: handleCurrencySubmit }}>
						<KolNumericFormatController
							control={currencyForm.control as any}
							name="currency"
							decimalScale={2}
							displayType="input"
							rules={{ required: 'Please enter a currency amount.' }}
							_label="Currency"
							_required
						/>
					</KolForm>
					<pre className="text-base mt-2">{JSON.stringify(currencyValues, null, 2)}</pre>
				</SampleBlock>
			</section>
		</>
	);
}
