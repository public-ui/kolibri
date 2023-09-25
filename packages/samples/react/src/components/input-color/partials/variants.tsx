import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputColorCases } from './cases';

export const InputColorVariants = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Color</legend>
				<InputColorCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Color (hideLabel)</legend>
				<InputColorCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
