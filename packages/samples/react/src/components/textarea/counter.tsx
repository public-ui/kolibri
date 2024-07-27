import React, { FC } from 'react';
import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TextareaCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_hasCounter</code>-property of KolTextarea. It shows how many characters have been entered.
			</p>
		</SampleDescription>

		<KolTextarea _label="Textara with counter" _hasCounter={true} />
	</>
);
