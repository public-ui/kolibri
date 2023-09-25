import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputEmailCases } from './cases';

export const InputEmailVariants = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Email</legend>
				<InputEmailCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Email (hideLabel)</legend>
				<InputEmailCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
