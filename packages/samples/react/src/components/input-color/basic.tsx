import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputColorVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputColorBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier sind verschiedene Formular-Felder mit Farben angezeigt. Links mit Label, Rechts nur nach anklicken mit Label. Die Farben können verändert werden.
				Die Buttons unten haben keine direkte Funktion. Sie können angeklickt werden.{' '}
			</p>
		</SampleDescription>
		<FormWrap RefComponent={InputColorVariants} />
	</>
);
