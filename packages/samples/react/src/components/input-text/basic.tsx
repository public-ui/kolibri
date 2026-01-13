import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases the most important InputText variants: default, required, validation error, disabled, read-only, and with icons.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="Name" _value="Anderson-Clark" />
			<KolInputText _label="Name" _required _msg={{ _type: 'error', _description: 'Please enter your name' }} _touched />
			<KolInputText _label="Name" _required _hint="Enter your surname" />
			<KolInputText _label="Name" _value="Anderson-Clark" _disabled />
			<KolInputText _label="Name" _readOnly _value="Anderson-Clark" />
			<KolInputText _label="Name" _icons="fa-solid fa-user" _value="Anderson-Clark" />
		</div>
	</>
);
