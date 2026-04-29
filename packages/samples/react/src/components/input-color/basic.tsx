import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputColorVariants } from './partials/variants';

export const InputColorBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputColor renders a color input. The sample shows KolInputColor in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputColorVariants} showButtons={false} />
	</>
);
