import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';

export const InputCheckboxButtonLabelAlign: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;button&quot; and label alignment left.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputCheckboxVariants} _variant="button" _labelAlign="left" />
	</>
);
