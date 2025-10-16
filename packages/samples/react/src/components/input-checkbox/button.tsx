import type { FC } from 'react';
import React from 'react';

import type { Components } from '@public-ui/components';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';

export const InputCheckboxButton: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox in the variant &quot;button&quot;.</p>
		</SampleDescription>

		<FormWrap<Components.KolInputCheckbox> RefComponent={InputCheckboxVariants} _variant="button" showButtons={false} />
	</>
);
