import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextDisabled: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This story demonstrates the disabled state of KolInputText. Disabled inputs cannot be edited or focused.</p>
		</SampleDescription>

		<SampleBlock id="placeholder">
			<KolInputText _label="Disabled with placeholder" _placeholder="Placeholder text" _disabled />
		</SampleBlock>
		<SampleBlock id="value">
			<KolInputText _label="Disabled with value" _value="This field is disabled" _disabled />
		</SampleBlock>
		<SampleBlock id="error">
			<KolInputText _label="Disabled with error message" _value="Invalid value" _msg={{ _type: 'error', _description: 'Error message' }} _disabled _touched />
		</SampleBlock>
		<SampleBlock id="enabled">
			<KolInputText _label="Comparison: Enabled" _value="This field is enabled" />
		</SampleBlock>
	</div>
);
