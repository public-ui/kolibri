import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputTextVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputText renders a text input field. The sample shows KolInputText in a form context with all variations and states.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputTextVariants} />
	</>
);
