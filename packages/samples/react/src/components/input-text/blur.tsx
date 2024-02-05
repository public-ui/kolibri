import { KolForm, KolInputText } from '@public-ui/react';
import React, { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextBlur: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Freitexteingabefeld. </p>
		</SampleDescription>
		<KolForm>
			<KolInputText
				_on={{
					onBlur: console.log,
				}}
				_type="search"
				_label="Suche"
			/>
		</KolForm>
	</>
);
