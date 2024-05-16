import { KolCombobox } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import { SampleDescription } from '../SampleDescription';

export const ComboboxBasic: FC = () => (
	<>
		<SampleDescription>The Combobox merges a text input with a suggestion list, enabling users to type or select their choice.</SampleDescription>
		<p>
			<KolCombobox _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
		</p>
		<p>
			<KolCombobox _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
		</p>
	</>
);
