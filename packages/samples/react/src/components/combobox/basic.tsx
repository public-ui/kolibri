import React from 'react';

import { KolComboBox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
import { SelectOption } from '@public-ui/components';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'Keine Auswahl',
		value: '',
		disabled: true,
	},
	{
		label: 'Frau',
		value: 'Frau',
	},
	{
		label: 'Herr',
		value: 'Herr',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

export const ComboboxbBasic: FC = () => (
	<>
		<SampleDescription>
			Here's combobox example: This combobox merges a text input with a dropdown list, enabling users to type or select their choice.
		</SampleDescription>
		<p>
			<KolComboBox _label="Label" _options={SALUTATION_OPTIONS} />
		</p>
	</>
);
