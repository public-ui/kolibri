import { KolForm, KolInputNumber } from '@public-ui/react-v19';
import * as React from 'react';

import { SampleDescription } from '../SampleDescription';

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

export function InputNumberNumberFormatter() {
	const formatter = new NumberFormatter();
	const [displayValue, setDisplayValue] = React.useState<number | undefined>(undefined);
	const [value, setValue] = React.useState<number | undefined>(-128);
	const [touched, setTouched] = React.useState(false);

	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates formatting number input to whole numbers. Decimal separators (. and ,) and scientific notation (e) are automatically removed
					on input.
				</p>
			</SampleDescription>
			<section className="w-full">
				<div className="p-2">
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
					<pre className="text-base">{JSON.stringify({ value, touched }, null, 2)}</pre>
				</div>
			</section>
		</>
	);
}
