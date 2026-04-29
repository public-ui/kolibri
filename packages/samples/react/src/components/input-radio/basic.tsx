import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputRadioVariants } from './partials/variants';

export const InputRadioBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputRadio renders a set of radio buttons. The sample shows KolInputRadio in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputRadioVariants} showButtons={false} />
	</>
);
