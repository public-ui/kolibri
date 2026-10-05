import { KolInputPassword } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordCounter: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases a password input with a counter for the chars in the field. Maximal length is 30.</p>
		</SampleDescription>

		<SampleBlock id="counter">
			<KolInputPassword _label="Password" _value="Hunter2" _hasCounter _maxLength={30} />
		</SampleBlock>
	</>
);
