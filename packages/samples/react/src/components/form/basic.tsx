import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolForm, KolInputText } from '@public-ui/react';

export const FormBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Dieses Beispiel zeigt ein Formular mit drei Eingabefeldern.</p>
		</SampleDescription>
		<KolForm>
			<KolInputText id="input1" _label="Eingabe 1" />
			<KolInputText id="input2" _label="Eingabe 2" />
			<KolInputText id="input3" _label="Eingabe 3" />
		</KolForm>
	</>
);
