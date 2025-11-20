import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { ERROR_MSG } from '../../shares/constants';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases basic KolInputText usage: simple text input, with error message, and disabled state.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="First name" _value="John Doe" />
			<KolInputText _label="Email" _value="john@example.com" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolInputText _label="Address" _value="123 Main Street" _disabled />
			<KolInputText
				_label="Username with icons"
				_value="squirrel_home"
				_icons={{
					left: {
						icon: 'codicon codicon-squirrel',
					},
					right: {
						icon: 'codicon codicon-home',
					},
				}}
			/>
		</div>
	</>
);
