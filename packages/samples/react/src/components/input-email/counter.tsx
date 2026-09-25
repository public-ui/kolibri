import { KolInputEmail } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputEmailCounter: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases an email input with a counter for the chars in the field. Maximal length is 30.</p>
		</SampleDescription>

		<SampleBlock id="counter">
			<KolInputEmail _label="E-Mail" _value="anderson@example.com" _hasCounter _maxLength={30} />
		</SampleBlock>
	</>
);
