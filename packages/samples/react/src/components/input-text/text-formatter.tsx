import { KolForm, KolInputText } from '@public-ui/react-v19';
import React, { useMemo, useRef, type BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SampleDescription } from '../SampleDescription';

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

function FormattedKolInputText({
	formatter,
	selectionStartRef,
	_on,
	_value,
	...props
}: KolInputTextProps & {
	formatter: IbanFormatter;
	selectionStartRef: React.MutableRefObject<number | null>;
}) {
	const inputRef = useRef<HTMLKolInputTextElement | null>(null);
	const normalizedOn = _on && typeof _on === 'object' ? (_on as KolInputTextEvents) : undefined;
	const sanitizedSelectionRef = selectionStartRef as React.MutableRefObject<number | null>;

	const element = inputRef.current;
	const selectionStart = sanitizedSelectionRef.current;
	const sanitizedFormatter: IbanFormatter = formatter;

	return (
		<KolInputText
			{...props}
			ref={inputRef}
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
}

function KolFormattedIbanController(props: any) {
	const { name, control, rules, defaultValue, shouldUnregister, disabled, formatter, selectionStartRef, ...componentProps } = props;
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
					<FormattedKolInputText
						{...(componentProps as any)}
						formatter={formatter}
						selectionStartRef={selectionStartRef}
						_value={field.value}
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

export function InputTextFormatterDemo() {
	const formatter = useMemo(() => new IbanFormatter(), []);

	const textInput1SelectionStart = useRef<number | null>(null);

	const initialIbanExampleValues: IbanExampleFormValues = {
		iban: 'DE89370400440532013000',
	};

	const ibanForm = useForm<IbanExampleFormValues>({
		defaultValues: initialIbanExampleValues,
		mode: 'onTouched',
	});

	const ibanValues = ibanForm.watch();

	const handleIbanSubmit = (event: Event) => {
		void ibanForm.handleSubmit(async () => {})(event as unknown as BaseSyntheticEvent);
	};

	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates formatting a data value in an input field (example IBAN). The data value is formatted to the input field (print format) and
					vice versa the formatting is removed again (machine format)
				</p>
			</SampleDescription>
			<section className="w-full">
				<div>
					<KolForm _on={{ onSubmit: handleIbanSubmit }}>
						<KolFormattedIbanController
							control={ibanForm.control as any}
							name="iban"
							id="field-iban"
							formatter={formatter}
							selectionStartRef={textInput1SelectionStart}
							rules={{ required: 'Please enter an IBAN.' }}
							_label="IBAN"
							_required
						/>
					</KolForm>
					<pre className="text-base mt-2">{JSON.stringify(ibanValues, null, 2)}</pre>
				</div>
			</section>
		</>
	);
}
