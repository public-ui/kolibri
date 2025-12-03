import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextBackground: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases the component placed on a colored background.</p>
		</SampleDescription>

		<div className="grid gap-4 bg-blue-100 p-4 rounded">
			<KolInputText _label="First name" _value="John Doe" />
		</div>
	</>
);
