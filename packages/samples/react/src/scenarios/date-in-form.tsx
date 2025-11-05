import { KolButton, KolForm, KolInputDate } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';

export const DateInForm: FC = () => (
	<>
		<SampleDescription>
			<p>KolForm with KolInputDate inside to make sure enter on the date icon does not submit the form.</p>
		</SampleDescription>

		<KolForm
			_on={{
				onSubmit: () => {
					console.error('submitted');
					alert('submitted');
				},
			}}
		>
			<KolInputDate _label="date" _name="datum" />
			<KolButton _label="Submit" _type="submit" />
		</KolForm>
	</>
);
