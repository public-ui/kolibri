import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextDisabled: FC = () => (
	<>
		<SampleDescription>
			<p>This story demonstrates the disabled state of KolInputText. Disabled inputs cannot be edited or focused.</p>
		</SampleDescription>

		<SampleBlock id="disabled">
			<KolInputText _label="Disabled with placeholder" _placeholder="Placeholder text" _disabled />
			<KolInputText _label="Disabled with value" _value="This field is disabled" _disabled />
			<KolInputText _label="Disabled with error message" _value="Invalid value" _msg={{ _type: 'error', _description: 'Error message' }} _disabled _touched />
			<KolInputText _label="Comparison: Enabled" _value="This field is enabled" />
		</SampleBlock>
	</>
);
