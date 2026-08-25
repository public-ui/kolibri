import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextBackground: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This story showcases the component placed on a colored background.</p>
		</SampleDescription>

		<SampleBlock id="background-default" className="grid gap-4 bg-blue-400 p-4 rounded">
			<strong>Default background:</strong>
			<KolInputText _label="First name" _value="John Doe" />
		</SampleBlock>
		<SampleBlock id="background-unset" className="grid gap-4 bg-blue-400 p-4 rounded">
			<strong>Unset background:</strong>
			<KolInputText style={{ backgroundColor: 'unset' }} _label="First name" _value="John Doe" />
		</SampleBlock>
	</div>
);
