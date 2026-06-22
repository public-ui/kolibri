import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextCounter: FC = () => (
	<>
		<SampleDescription>
			<p>This story showcases an input with a counter for the chars in the field. Maximal length is 30.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="Name" _icons="kolicon-house" _value="Anderson-Clark" _hasCounter _maxLength={30} />

			<KolInputText _label="max length ohne counter?" _icons="kolicon-house" _value="12" _maxLength={3} />
		</div>
	</>
);
