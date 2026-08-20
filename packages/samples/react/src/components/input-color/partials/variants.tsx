import React, { forwardRef } from 'react';

import { InputColorCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputColorVariants = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset data-visual-block="color">
				<legend>Color</legend>
				<InputColorCases {...props} />
			</fieldset>
			<fieldset data-visual-block="color-hide-label">
				<legend>Color (hideLabel)</legend>
				<InputColorCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
