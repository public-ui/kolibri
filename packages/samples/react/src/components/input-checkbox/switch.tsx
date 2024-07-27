import React, { FC } from 'react';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';

export const InputCheckboxSwitch: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;switch&quot;.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputCheckboxVariants} _variant="switch" />
	</>
);
