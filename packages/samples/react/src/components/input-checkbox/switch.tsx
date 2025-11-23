import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';

export const InputCheckboxSwitch: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;switch&quot;.</p>
		</SampleDescription>

		<FormWrap RefComponent={InputCheckboxVariants} _variant="switch" showButtons={false} />
	</>
);
