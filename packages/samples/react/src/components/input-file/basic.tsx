import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputFileVariants } from './partials/variants';

export const InputFileBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputFile renders a file input field. The sample shows KolInputFile in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputFileVariants} showButtons={false} />
	</>
);
