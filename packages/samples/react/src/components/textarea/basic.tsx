import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { TextareaVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const TextareaBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolTextarea renders a text field. The sample shows KolTextarea in a form context with different variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={TextareaVariants} />
	</>
);
