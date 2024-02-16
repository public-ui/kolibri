import React from 'react';

import { KolForm, KolInputRadio } from '@public-ui/react';

import { ERROR_MSG } from '../../shares/constants';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

const options = [
	{ label: 'Frau', value: 'Frau' },
	{ disabled: true, label: 'Herr (disabled)', value: 'Herr' },
	{ label: 'Firma', value: 'Firma' },
];

export const InputRadioSelect: FC = () => (
	<>
		<SampleDescription>
			<p>Hier verstehe ich Fehlermeldung nicht. Hier ist ein Beispiel Radio-Button. Nur eine gleichzeitige Auswahl ist möglich. </p>
		</SampleDescription>
		<KolForm className="grid gap-4">
			<KolInputRadio _error={ERROR_MSG} _options={options} _label="Anrede" />
		</KolForm>
	</>
);
