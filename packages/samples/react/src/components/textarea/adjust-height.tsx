import React from 'react';
import { KolForm, KolTextarea } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const VALUE = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
sit amet.`;

export const TextareaAdjustHeight: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_adjustHeight</code>-property of KolTextarea. The textarea automatically grows with its content.
			</p>
		</SampleDescription>

		<KolForm>
			<KolTextarea _adjustHeight={true} _value={VALUE} _label="Text input (auto grow)" />
		</KolForm>
	</>
);
