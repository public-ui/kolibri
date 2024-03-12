import type { FC } from 'react';
import React from 'react';

import { KolForm, KolInputRadio } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

export const InputRadioObjectValue: FC = () => {
	const options = [
		{ label: 'Field 1', value: { id: 1, name: 'Option 1' } },
		{ label: 'Field 2', value: { id: 2, name: 'Option 2' } },
	];

	return (
		<div className="grid gap-4">
			<SampleDescription>
				In Diesem Beispiel für <code>KolInputRadio</code> werden die Werte der Optionen als Objekte definiert.
			</SampleDescription>
			<KolForm>
				<div className="container my-4 d-grid gap-4">
					<KolInputRadio _value={options[1].value} _options={options} _label="Test(mit Objekt-Wert)" />
				</div>
			</KolForm>
		</div>
	);
};
