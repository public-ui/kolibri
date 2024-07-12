import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputPasswordVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputPassword renders an password input field. The sample shows KolInputPassword in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputPasswordVariants} />
	</>
);
