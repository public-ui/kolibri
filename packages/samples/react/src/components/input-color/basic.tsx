import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputColorVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputColorBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputColor renders a color input. The sample shows KolInputColor in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputColorVariants} />
	</>
);
