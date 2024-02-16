import { KolForm, KolInputText } from '@public-ui/react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import type { FC } from 'react';

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
