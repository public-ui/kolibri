import React, { forwardRef } from 'react';

import { InputEmailCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputEmailVariants = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset data-visual-block="email">
				<legend>Email</legend>
				<InputEmailCases {...props} />
			</fieldset>
			<fieldset data-visual-block="email-hide-label">
				<legend>Email (hideLabel)</legend>
				<InputEmailCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
