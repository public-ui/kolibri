import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { TextareaVariants } from './partials/variants';

export const TextareaBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolTextarea renders a text field. The sample shows KolTextarea in a form context with different variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={TextareaVariants} showButtons={false} />
	</>
);
