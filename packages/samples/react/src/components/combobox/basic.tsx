import React from 'react';

import { KolCombobox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

const SALUTATION_OPTIONS: string[] = ['Keine Auswahl', 'Frau', 'Herr', 'Divers'];

export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>
			Her&apos;s Combobox example: This Combobox merges a text input with a dropdown list, enabling users to type or select their choice.
		</SampleDescription>
		<p>
			<KolCombobox _label="Label" _options={SALUTATION_OPTIONS} _value={'Frau'} />
		</p>
	</>
);
