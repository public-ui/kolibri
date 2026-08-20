import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextMessageTypes: FC = () => (
	<>
		<SampleDescription>
			<p>This story demonstrates all available message types for KolInputText: default, info, error, warning, and success.</p>
		</SampleDescription>

		<SampleBlock id="message-types">
			<KolInputText _label="Default message" _value="Valid value" _msg={{ _type: 'default', _description: 'This is a default message' }} _touched />
			<KolInputText _label="Error message" _value="Invalid value" _msg={{ _type: 'error', _description: 'This is an error message' }} _touched />
			<KolInputText _label="Info message" _value="Some value" _msg={{ _type: 'info', _description: 'This is an informational message' }} _touched />
			<KolInputText _label="Success message" _value="Valid value" _msg={{ _type: 'success', _description: 'This is a success message' }} _touched />
			<KolInputText _label="Warning message" _value="Valid value" _msg={{ _type: 'warning', _description: 'This is a warning message' }} _touched />
		</SampleBlock>
	</>
);
