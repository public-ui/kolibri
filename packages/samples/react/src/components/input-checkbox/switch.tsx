import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';

export const InputCheckboxSwitch: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;switch&quot;.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputCheckboxVariants} _variant="switch" />
	</>
);
