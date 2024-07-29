import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputDateVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputDateBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputDate renders all types of fields for date and time input. The sample shows KolInputDate in a form context with all variations and states.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputDateVariants} />
	</>
);
