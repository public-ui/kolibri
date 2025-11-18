import { KolCombobox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const ComboboxHtml: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>A HTML only KolCombobox.</p>
			</SampleDescription>

			<KolCombobox _label="With string array in html" _suggestions="['Herr','Frau','Firma']" _value="Herr" />
		</>
	);
};
