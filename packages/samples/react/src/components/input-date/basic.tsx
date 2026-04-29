import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputDateVariants } from './partials/variants';

export const InputDateBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputDate renders all types of fields for date and time input. The sample shows KolInputDate in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputDateVariants} showButtons={false} />
	</>
);
