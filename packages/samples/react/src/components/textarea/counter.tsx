import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TextareaCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_hasCounter</code>-property of KolTextarea. It shows how many characters have been entered.
			</p>
		</SampleDescription>

		<section className="w-full">
		  <KolTextarea _label="Textara with counter" _hasCounter={true} />
		  <KolTextarea _label="Textara with counter and initial value" _hasCounter={true} _value={'Lorem Ipsum'} className="mt" />
    </section>
   </>
);
