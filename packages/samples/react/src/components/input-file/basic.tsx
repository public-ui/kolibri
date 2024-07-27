import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputFileVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputFileBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputFile renders a file input field. The sample shows KolInputFile in a form context with all variations and states.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputFileVariants} />
	</>
);
