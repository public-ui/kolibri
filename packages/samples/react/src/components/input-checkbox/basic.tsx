import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputCheckboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputCheckbox renders a checkbox. The sample shows KolInputCheckbox in a form context with all variations and states.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputCheckboxVariants} />
	</>
);
