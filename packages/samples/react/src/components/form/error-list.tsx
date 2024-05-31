import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolForm, KolInputText } from '@public-ui/react';

export const FormErrorList: FC = () => (
	<>
		<SampleDescription>
			<p>Dieses Beispiel zeigt ein Formular mit drei Eingabefeldern. Das zweite Eingabefeld enthält einen Fehler. </p>
		</SampleDescription>
		<KolForm
			_errorList={[
				{
					message: 'Fehler in Eingabe 2',
					selector: '#input2',
				},
			]}
		>
			<KolInputText id="input1" _label="Eingabe 1" />
			<KolInputText id="input2" _label="Eingabe 2" _touched _msg={{ _description: 'Fehlerhafte Eingabe', _type: 'error' }} />
			<KolInputText id="input3" _label="Eingabe 3" />
		</KolForm>
	</>
);
