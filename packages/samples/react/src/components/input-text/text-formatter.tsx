import { KolForm, KolHeading, KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SampleDescription } from '../SampleDescription';

class IbanFormatter {
	private readonly SEPARATOR = ' ';
	private readonly CHARS_PER_GROUP = 4;
	private readonly KEEP_ALPHANUM = /[^a-zA-Z0-9]/g;

	parse(value: string): string {
		return value.replace(this.KEEP_ALPHANUM, '').toUpperCase();
	}

	format(value: string): string {
		const clean = this.parse(value);
		const regex = new RegExp(`(.{${this.CHARS_PER_GROUP}})(?!$)`, 'g');
		return clean.replace(regex, `$1${this.SEPARATOR}`);
	}

	adjustCursorPosition(oldValue: string, newValue: string, oldCursorPos: number): number {
		const oldText = this.format(oldValue);
		const newText = this.format(newValue);

		if (oldCursorPos >= oldText.length) return newText.length;

		// Zähle Zeichen bis Cursor (ignoriere Separatoren)
		let significantChars = 0;
		for (let i = 0; i < oldCursorPos && i < oldText.length; i++) {
			if (oldText[i] !== this.SEPARATOR) significantChars++;
		}

		// Finde entsprechende Position im neuen Text
		let count = 0;
		for (let i = 0; i < newText.length; i++) {
			if (newText[i] !== this.SEPARATOR && count++ === significantChars) return i;
		}
		return newText.length;
	}
}

class CurrencyFormatter {
	private readonly LOCALE = navigator.language;
	private readonly CURRENCY_SYMBOL = ' €';

	parse(value: string): number {
		const sanitized = value.replace(/[^\d.,]/g, '').replace(/,/g, '.');
		return parseFloat(sanitized) || 0;
	}

	format(value: number | string): string {
		const number = typeof value === 'string' ? this.parse(value) : value;
		const formatted = new Intl.NumberFormat(this.LOCALE, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number);
		return formatted + this.CURRENCY_SYMBOL;
	}

	adjustCursorPosition(oldValue: string, newValue: string, oldCursorPos: number): number {
		const oldText = this.format(oldValue);
		const newText = this.format(newValue);

		if (oldCursorPos >= oldText.length) return newText.length;

		// Zähle Ziffern bis Cursor
		let digitCount = 0;
		for (let i = 0; i < oldCursorPos && i < oldText.length; i++) {
			if (/\d/.test(oldText[i])) digitCount++;
		}

		// Finde entsprechende Position im neuen Text
		let count = 0;
		for (let i = 0; i < newText.length; i++) {
			if (/\d/.test(newText[i]) && count++ === digitCount) return i;
		}
		return newText.length;
	}
}

type IbanExampleFormValues = {
	iban: string;
};

type CurrencyExampleFormValues = {
	currency: number;
};

export function InputTextFormatterDemo() {
	const ibanFormatter = new IbanFormatter();
	const currencyFormatter = new CurrencyFormatter();

	const ibanForm = useForm<IbanExampleFormValues>({
		defaultValues: { iban: 'DE89370400440532013000' },
	});
	const currencyForm = useForm<CurrencyExampleFormValues>({
		defaultValues: { currency: 1000000 },
	});

	const handleIbanInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const newValue = ibanFormatter.parse(input.value);
		const newCursorPos = ibanFormatter.adjustCursorPosition(ibanForm.getValues('iban'), newValue, input.selectionStart || 0);

		ibanForm.setValue('iban', newValue);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				input.setSelectionRange(newCursorPos, newCursorPos);
			});
		});
	};

	return (
		<>
			<SampleDescription>
				<p>This example demonstrates two different formatting strategies:</p>
				<ul>
					<li>
						<strong>Live Formatting (IBAN):</strong> Formatierung während der Eingabe. Der Wert wird sofort formatiert und angezeigt, mit intelligenter
						Cursor-Position.
					</li>
					<li>
						<strong>On-Blur Formatting (Currency):</strong> Formatierung beim Verlassen des Feldes. Ermöglicht freies Tippen ohne Unterbrechung durch
						Formatierung.
					</li>
				</ul>
			</SampleDescription>
			<section className="w-full flex flex-col">
				<div className="p-2">
					<KolHeading _label="Live Formatting - IBAN" _level={2} />
					<p className="text-sm mb-2">Formatierung erfolgt während der Eingabe mit intelligenter Cursor-Kontrolle</p>
					<KolForm>
						<form onSubmit={ibanForm.handleSubmit(async () => {})}>
							<Controller
								name="iban"
								control={ibanForm.control}
								render={({ field }) => (
									<div className="block mt-2">
										<KolInputText
											id="field-iban"
											_label="IBAN"
											_value={ibanFormatter.format(field.value ?? '')}
											_required
											_on={{
												onInput: handleIbanInput,
												onBlur: field.onBlur,
											}}
										/>
									</div>
								)}
							/>
						</form>
					</KolForm>
				</div>
				<div className="p-2">
					<KolHeading _label="Model" _level={2} />
					<pre className="text-base">{JSON.stringify(ibanForm.watch(), null, 2)}</pre>
				</div>
			</section>

			<section className="w-full flex flex-col">
				<div className="p-2">
					<KolHeading _label="On-Blur Formatting - Currency" _level={2} />
					<p className="text-sm mb-2">Formatierung erfolgt beim Verlassen des Feldes (onBlur) für ungestörte Eingabe</p>
					<KolForm>
						<form onSubmit={currencyForm.handleSubmit(async () => {})}>
							<Controller
								name="currency"
								control={currencyForm.control}
								render={({ field }) => (
									<div className="block mt-2">
										<KolInputText
											id="field-currency"
											_label="Currency"
											_value={currencyFormatter.format(field.value ?? 0)}
											_on={{
												onBlur: (event: Event) => {
													const parsed = currencyFormatter.parse((event.target as HTMLInputElement).value);
													field.onChange(parsed);
													field.onBlur();
												},
											}}
										/>
									</div>
								)}
							/>
						</form>
					</KolForm>
				</div>
				<div className="p-2">
					<KolHeading _label="Model" _level={2} />
					<pre className="text-base">{JSON.stringify(currencyForm.watch(), null, 2)}</pre>
				</div>
			</section>
		</>
	);
}
