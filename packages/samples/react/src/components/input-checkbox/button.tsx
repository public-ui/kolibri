import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputCheckboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxButton: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;button&quot;.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputCheckboxVariants} _variant="button" />
	</>
);
