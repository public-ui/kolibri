import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { TextareaVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const TextareaBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind Freitextfelder die mithilfe des Reglers unten Rechts im jeweiligen Feld in ihrer Größe angepasst werden können.</p>
		</SampleDescription>
		<FormWrap RefComponent={TextareaVariants} />
	</>
);
