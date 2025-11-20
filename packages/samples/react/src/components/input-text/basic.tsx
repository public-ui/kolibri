import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG } from '../../shares/constants';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases basic KolInputText usage: simple text input, with error message, and disabled state.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="First name" _value="John Doe" />
			<KolInputText _label="Email" _value="john@example.com" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolInputText _label="Address" _value="123 Main Street" _disabled />
		</div>
	</>
);
