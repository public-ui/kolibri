import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEmailVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputEmailBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputEmail renders an email input field. The sample shows KolInputEmail in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputEmailVariants} />
	</>
);
