import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TextareaWithCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_characterLimit</code>-property of KolTextarea. It shows how many characters you have left.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolTextarea _label="Textara with charachter limit" _value={'Lorem Ipsum'} className="mt" _characterLimit={20} />
		</section>
	</>
);
