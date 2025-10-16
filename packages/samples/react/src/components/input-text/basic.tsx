import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputTextVariants } from './partials/variants';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputText renders a text input field. The sample shows KolInputText in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputTextVariants} showButtons={false} />
	</>
);
