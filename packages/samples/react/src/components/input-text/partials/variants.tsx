import React, { forwardRef } from 'react';

import { InputTextCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputTextVariants = forwardRef<HTMLKolInputTextElement, Components.KolInputText>(function InputTextVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<InputTextCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<InputTextCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
