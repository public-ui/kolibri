import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputTextVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputText renders an text input field. The sample shows KolInputText in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputTextVariants} />
	</>
);
