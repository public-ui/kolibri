import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Checkbox</legend>
				<InputCheckboxCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Checkbox (hideLabel)</legend>
				<InputCheckboxCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
