import { withController } from '@public-ui/react-hook-form-adapter';
import { KolForm, KolHeading, KolInputText } from '@public-ui/react-v19';
import React, { useMemo, useRef, type BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

import { SampleDescription } from '../SampleDescription';

import { NumericFormat, type NumberFormatValues, type NumericFormatProps } from 'react-number-format';

type InputTextElementSelection = {
	setSelectionStart?: (position: number) => Promise<void>;
	selectionStart?: () => Promise<number | null>;
};

type KolInputTextEvents = {
	onBlur?: (event: Event) => void;
	onChange?: (event: Event, value: unknown) => void;
	onFocus?: (event: Event) => void;
	onInput?: (event: Event, value: unknown) => void;
};
type KolInputTextProps = Omit<React.ComponentProps<typeof KolInputText>, '_on' | '_value'> & {
	_on?: KolInputTextEvents;
	_value?: string;
};

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

	public format(value: string, ref?: HTMLKolInputTextElement | null, selectionStart?: number | null): string {
		const setSelectionStart = (ref as InputTextElementSelection | null)?.setSelectionStart;
		if (selectionStart && setSelectionStart) {
			if (selectionStart % 5 === 0) selectionStart++;
			void setSelectionStart(selectionStart);
		}
		return this.printFormat(value);
	}
}

type IbanExampleFormValues = {
	iban: string;
};

type CurrencyExampleFormValues = {
	currency: number;
};

const FormattedKolInputText = React.forwardRef<
	HTMLKolInputTextElement,
	KolInputTextProps & {
		formatter: IbanFormatter;
		selectionStartRef: React.MutableRefObject<number | null>;
	}
>(({ formatter, selectionStartRef, _on, _value, ...props }, ref) => {
	const inputRef = useRef<HTMLKolInputTextElement | null>(null);
	const normalizedOn = _on && typeof _on === 'object' ? (_on as KolInputTextEvents) : undefined;
	const sanitizedSelectionRef = selectionStartRef as React.MutableRefObject<number | null>;

	const mergeRef = (element: HTMLKolInputTextElement | null) => {
		inputRef.current = element;
		if (typeof ref === 'function') {
			ref(element);
		} else if (ref) {
			ref.current = element;
		}
	};

	const element = inputRef.current;
	const selectionStart = sanitizedSelectionRef.current;
	const sanitizedFormatter: IbanFormatter = formatter;

	return (
		<KolInputText
			{...props}
			ref={mergeRef}
			_value={sanitizedFormatter.format(_value ?? '', element, selectionStart)}
			_on={{
				...normalizedOn,
				onInput: (event: Event, value: unknown) => {
					const selectionStartGetter = (inputRef.current as InputTextElementSelection | null)?.selectionStart;
					selectionStartGetter?.().then((start) => {
						sanitizedSelectionRef.current = start ?? null;
					});
					const parsedValue = sanitizedFormatter.parse(typeof value === 'string' ? value : '');
					normalizedOn?.onInput?.(event, parsedValue);
				},
			}}
		/>
	);
});
FormattedKolInputText.displayName = 'FormattedKolInputText';

const KolFormattedIbanController = withController(FormattedKolInputText as any, '_value') as React.ForwardRefExoticComponent<
	Omit<React.ComponentProps<typeof FormattedKolInputText>, '_value'> & {
		name: string;
		control: any;
		rules?: any;
		defaultValue?: any;
		shouldUnregister?: boolean;
		disabled?: boolean;
	} & React.RefAttributes<HTMLKolInputTextElement>
>;

type KolNumericFormatControllerProps = {
	_label: string;
	_msg?: React.ComponentProps<typeof KolInputText>['_msg'];
	_touched?: boolean;
	_on?: React.ComponentProps<typeof KolInputText>['_on'];
	_required?: boolean;
} & Omit<NumericFormatProps, 'customInput' | 'value' | 'onBlur' | 'onValueChange'>;

const KolNumericFormat = React.forwardRef<HTMLKolInputTextElement, KolNumericFormatControllerProps>(
	({ _label, _msg, _touched, _on, _required, thousandSeparator = true, suffix = '€', ...props }, ref) => {
		const normalizedOn = _on && typeof _on === 'object' ? (_on as KolInputTextEvents) : undefined;

		return (
			<NumericFormat
				{...(props as any)}
				suffix={suffix}
				thousandSeparator={thousandSeparator}
				valueIsNumericString={false}
				customInput={(inputProps: Partial<KolInputTextProps> & KolInputTextEvents) => (
					<KolInputText
						{...inputProps}
						_label={_label}
						_msg={_msg}
						_touched={_touched}
						_required={_required}
						_on={{
							onBlur: inputProps.onBlur as ((event: Event) => void) | undefined,
							onChange: inputProps.onChange as ((event: Event, value: unknown) => void) | undefined,
							onFocus: inputProps.onFocus as ((event: Event) => void) | undefined,
						}}
					/>
				)}
				getInputRef={ref as React.Ref<HTMLInputElement>}
				onValueChange={(value: NumberFormatValues) => {
					const fakeEvent = new Event('change');
					normalizedOn?.onChange?.(fakeEvent, value.floatValue);
				}}
				onBlur={(event) => {
					normalizedOn?.onBlur?.(event.nativeEvent);
				}}
			/>
		);
	},
);
KolNumericFormat.displayName = 'KolNumericFormat';

const KolNumericFormatController = withController(KolNumericFormat as any, 'value') as React.ForwardRefExoticComponent<
	KolNumericFormatControllerProps & {
		name: string;
		control: any;
		rules?: any;
		defaultValue?: any;
		shouldUnregister?: boolean;
		disabled?: boolean;
	} & React.RefAttributes<HTMLKolInputTextElement>
>;

export function InputTextFormatterDemo() {
	const formatter = useMemo(() => new IbanFormatter(), []);

	const textInput1 = useRef<HTMLKolInputTextElement>(null);
	const textInput1SelectionStart = useRef<number | null>(null);

	const initialIbanExampleValues: IbanExampleFormValues = {
		iban: 'DE89370400440532013000',
	};

	const initialCurrencyExampleValues: CurrencyExampleFormValues = {
		currency: 1000000,
	};

	const ibanForm = useForm<IbanExampleFormValues>({
		defaultValues: initialIbanExampleValues,
		mode: 'onTouched',
	});
	const currencyForm = useForm<CurrencyExampleFormValues>({
		defaultValues: initialCurrencyExampleValues,
		mode: 'onTouched',
	});

	const ibanValues = ibanForm.watch();
	const currencyValues = currencyForm.watch();

	const handleIbanSubmit = (event: Event) => {
		void ibanForm.handleSubmit(async () => {})(event as unknown as BaseSyntheticEvent);
	};

	const handleCurrencySubmit = (event: Event) => {
		void currencyForm.handleSubmit(async () => {})(event as unknown as BaseSyntheticEvent);
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
				<KolForm _on={{ onSubmit: handleIbanSubmit }}>
					<div className="p-2">
						<KolHeading _label="Formatted Form Field" _level={2} />
						<KolFormattedIbanController
							control={ibanForm.control}
							name="iban"
							id="field-iban"
							formatter={formatter}
							selectionStartRef={textInput1SelectionStart}
							rules={{ required: 'Please enter an IBAN.' }}
							_label="IBAN"
							_required
							ref={textInput1}
						/>
					</div>
				</KolForm>
				<div className="p-2">
					<KolHeading _label="Model" _level={2} />
					<pre className="text-base">{JSON.stringify(ibanValues, null, 2)}</pre>
				</div>
			</section>

			<section className="w-full flex flex-col">
				<KolForm _on={{ onSubmit: handleCurrencySubmit }}>
					<div className="p-2">
						<KolHeading _label="Formatted Form Field (with react-number-format)" _level={2} />
						<KolNumericFormatController
							control={currencyForm.control}
							name="currency"
							decimalScale={2}
							displayType="input"
							rules={{ required: 'Please enter a currency amount.' }}
							_label="Currency"
							_required
						/>
					</div>
				</KolForm>
				<div className="p-2">
					<KolHeading _label="Model" _level={2} />
					<pre className="text-base">{JSON.stringify(currencyValues, null, 2)}</pre>
				</div>
			</section>
		</>
	);
}
