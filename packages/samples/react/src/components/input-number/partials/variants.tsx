import React, { forwardRef } from 'react';

import { InputNumberCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputNumberVariants = forwardRef<HTMLKolInputNumberElement, Components.KolInputNumber>(function InputNumberVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Number</legend>
				<InputNumberCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Number (hideLabel)</legend>
				<InputNumberCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
