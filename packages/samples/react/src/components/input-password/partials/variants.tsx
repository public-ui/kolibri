import React, { forwardRef } from 'react';

import { InputPasswordCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputPasswordVariants = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Password</legend>
				<InputPasswordCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Password (hideLabel)</legend>
				<InputPasswordCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
