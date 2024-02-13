import React, { forwardRef } from 'react';

import { InputPasswordCases } from './cases';

import type { Components } from '@public-ui/components';
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
