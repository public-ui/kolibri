import React, { forwardRef } from 'react';

import { InputDateCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputDateVariants = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Date</legend>
				<InputDateCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Date (hideLabel)</legend>
				<InputDateCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
