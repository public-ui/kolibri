import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';

export const InputCheckboxBasicLabelAlign: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputCheckbox renders a checkbox. The sample shows KolInputCheckbox in a form context with all variations, states and label alignment left.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputCheckboxVariants} _labelAlign="left" />
	</>
);
