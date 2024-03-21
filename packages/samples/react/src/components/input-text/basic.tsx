import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputTextVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind verschiedene Freitexteingabefelder.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputTextVariants} />
	</>
);
