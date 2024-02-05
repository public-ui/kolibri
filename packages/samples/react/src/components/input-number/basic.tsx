import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputNumberVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputNumberBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier werden verschiedene Zahleneingaben dargestellt. Rechts im Feld gibt es Schalter, durch deren anklicken man die Zahl verändern kann. Beim Feld
				&apos;Readonly&apos; gibt es keine Ineraktionsmöglichkeit.
			</p>
		</SampleDescription>
		<FormWrap RefComponent={InputNumberVariants} />
	</>
);
