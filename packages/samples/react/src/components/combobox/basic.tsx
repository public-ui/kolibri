import { KolCombobox } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import { SampleDescription } from '../SampleDescription';

export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>
			Her&apos;s Combobox example: This Combobox merges a text input with a dropdown list, enabling users to type or select their choice.
		</SampleDescription>
		<p>
			<KolCombobox _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
		</p>
	</>
);
