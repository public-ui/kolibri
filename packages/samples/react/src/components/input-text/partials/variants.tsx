import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputTextCases } from './cases';

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
