import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputPasswordCases } from './cases';

export const InputPasswordVariants = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Password</legend>
				<InputPasswordCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Password (hideLabel)</legend>
				<InputPasswordCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
