import { KolForm, KolHeading, KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

/**
 * IbanFormatter handles formatting and parsing of IBAN values.
 * It groups characters in blocks of 4, separated by spaces.
 * Example: "DE89370400440532013000" → "DE89 3704 0044 0532 0130 00"
 */
class IbanFormatter {
	private readonly SEPARATOR = ' ';
	private readonly CHARS_PER_GROUP = 4;
	private readonly KEEP_ALPHANUM = /[^a-zA-Z0-9]/g;

	/**
	 * Removes all non-alphanumeric characters and converts to uppercase.
	 * This is the raw value stored in the form model.
	 */
	parse(value: string): string {
		return value.replace(this.KEEP_ALPHANUM, '').toUpperCase();
	}

	/**
	 * Formats the value into groups of 4 characters separated by spaces.
	 * This is the display value shown in the input field.
	 */
	format(value: string): string {
		const clean = this.parse(value);
		const regex = new RegExp(`(.{${this.CHARS_PER_GROUP}})(?!$)`, 'g');
		return clean.replace(regex, `$1${this.SEPARATOR}`);
	}

	/**
	 * Calculates the correct cursor position after formatting changes.
	 * This ensures the cursor stays at the expected position when separators are added/removed.
	 */
	adjustCursorPosition(oldValue: string, newValue: string, oldCursorPos: number): number {
		const oldText = this.format(oldValue);
		const newText = this.format(newValue);

		if (oldCursorPos >= oldText.length) return newText.length;

		// Count significant characters (excluding separators) up to cursor position
		let significantChars = 0;
		for (let i = 0; i < oldCursorPos && i < oldText.length; i++) {
			if (oldText[i] !== this.SEPARATOR) significantChars++;
		}

		// Find the corresponding position in the new formatted text
		let count = 0;
		for (let i = 0; i < newText.length; i++) {
			if (newText[i] !== this.SEPARATOR && count++ === significantChars) return i;
		}
		return newText.length;
	}
}

/**
 * CurrencyFormatter handles formatting and parsing of currency values.
 * It uses the browser's locale for formatting and intelligently detects
 * decimal vs. thousand separators when parsing.
 * Example: 1000000 → "1.000.000,00 €" (German locale)
 */
class CurrencyFormatter {
	private readonly LOCALE = navigator.language;
	private readonly CURRENCY_SYMBOL = ' €';

	/**
	 * Parses a formatted currency string back to a raw number.
	 * Intelligently detects which character is the decimal separator:
	 * - German format: "1.000.000,00" → 1000000 (dot is thousand, comma is decimal)
	 * - English format: "1,000,000.00" → 1000000 (comma is thousand, dot is decimal)
	 */
	parse(value: string): number {
		// Remove currency symbols and keep only digits, dots, and commas
		const sanitized = value.replace(/[^\d.,]/g, '');

		// Determine which character is the decimal separator
		// The rightmost occurrence is typically the decimal separator
		const lastCommaIndex = sanitized.lastIndexOf(',');
		const lastDotIndex = sanitized.lastIndexOf('.');

		let normalizedValue: string;

		if (lastCommaIndex > lastDotIndex) {
			// Comma is decimal separator (e.g., German: 1.000.000,00)
			// Remove all dots (thousand separators) and replace comma with dot for parseFloat
			normalizedValue = sanitized.replace(/\./g, '').replace(',', '.');
		} else if (lastDotIndex > lastCommaIndex) {
			// Dot is decimal separator (e.g., English: 1,000,000.00)
			// Remove all commas (thousand separators)
			normalizedValue = sanitized.replace(/,/g, '');
		} else {
			// No decimal separator present, remove all dots and commas
			normalizedValue = sanitized.replace(/[.,]/g, '');
		}

		return parseFloat(normalizedValue) || 0;
	}

	/**
	 * Formats a number as currency according to the browser's locale.
	 * Always shows 2 decimal places and appends the currency symbol.
	 */
	format(value: number | string): string {
		const number = typeof value === 'string' ? this.parse(value) : value;
		const formatted = new Intl.NumberFormat(this.LOCALE, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number);
		return formatted + this.CURRENCY_SYMBOL;
	}

	/**
	 * Calculates the correct cursor position after formatting changes.
	 * This ensures the cursor stays aligned with digits when thousand separators are added/removed.
	 */
	adjustCursorPosition(oldValue: string, newValue: string, oldCursorPos: number): number {
		const oldText = this.format(oldValue);
		const newText = this.format(newValue);

		if (oldCursorPos >= oldText.length) return newText.length;

		// Count digits up to cursor position (ignoring separators and currency symbols)
		let digitCount = 0;
		for (let i = 0; i < oldCursorPos && i < oldText.length; i++) {
			if (/\d/.test(oldText[i])) digitCount++;
		}

		// Find the corresponding position in the new formatted text
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

/**
 * Demo component showcasing two different text formatting strategies for input fields.
 *
 * Strategy 1 - Live Formatting (IBAN):
 * - Formats text while typing
 * - Maintains intelligent cursor positioning
 * - Best for: Fixed-format values where users expect immediate visual feedback
 *
 * Strategy 2 - On-Blur Formatting (Currency):
 * - Formats only when field loses focus (onBlur event)
 * - Allows free typing without formatting interruptions
 * - Best for: Numeric values where users might type in various formats
 */
export function InputTextFormatterDemo() {
	const ibanFormatter = new IbanFormatter();
	const currencyFormatter = new CurrencyFormatter();

	const ibanForm = useForm<IbanExampleFormValues>({
		defaultValues: { iban: 'DE89370400440532013000' },
	});
	const currencyForm = useForm<CurrencyExampleFormValues>({
		defaultValues: { currency: 1000000 },
	});

	/**
	 * Handles input events for the IBAN field with live formatting.
	 * Updates the model value and adjusts cursor position to maintain UX during formatting.
	 */
	const handleIbanInput = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const newValue = ibanFormatter.parse(input.value);
		const newCursorPos = ibanFormatter.adjustCursorPosition(ibanForm.getValues('iban'), newValue, input.selectionStart || 0);

		// Update the form model with the parsed (unformatted) value
		ibanForm.setValue('iban', newValue);

		// Use double requestAnimationFrame to ensure cursor position is set after React re-render
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				input.setSelectionRange(newCursorPos, newCursorPos);
			});
		});
	};

	return (
		<>
			<SampleDescription>
				<p>This example demonstrates two different formatting strategies for input fields:</p>
				<ul>
					<li>
						<strong>Live Formatting (IBAN):</strong> Formatting happens while typing. The value is immediately formatted and displayed with intelligent cursor
						positioning. Best for fixed-format values where users expect visual feedback during input.
					</li>
					<li>
						<strong>On-Blur Formatting (Currency):</strong> Formatting happens when leaving the field (onBlur event). Allows free typing without interruption.
						Best for numeric values where users might input in various formats.
					</li>
				</ul>
				<p>
					<strong>Key Concept:</strong> The form model always stores the <em>unformatted</em> value (raw IBAN string, numeric currency value), while the input
					field displays the <em>formatted</em> value for better readability.
				</p>
			</SampleDescription>
			<SampleBlock id="iban" className="w-full flex flex-col">
				<div className="p-2">
					<KolHeading _label="Live Formatting - IBAN" _level={2} />
					<p className="text-sm mb-2">Formatting occurs during input with intelligent cursor control</p>
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
					<KolHeading _label="Model (Unformatted Value)" _level={2} />
					<pre className="text-base">{JSON.stringify(ibanForm.watch(), null, 2)}</pre>
				</div>
			</SampleBlock>

			<SampleBlock id="currency" className="w-full flex flex-col">
				<div className="p-2">
					<KolHeading _label="On-Blur Formatting - Currency" _level={2} />
					<p className="text-sm mb-2">Formatting occurs when leaving the field (onBlur) for uninterrupted input</p>
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
													const input = event.target as HTMLInputElement;
													const parsedValue = currencyFormatter.parse(input.value);
													field.onChange(parsedValue);
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
					<KolHeading _label="Model (Numeric Value)" _level={2} />
					<pre className="text-base">{JSON.stringify(currencyForm.watch(), null, 2)}</pre>
				</div>
			</SampleBlock>
		</>
	);
}
