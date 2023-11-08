import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputRadioCases } from './cases';

export const InputRadioVariants = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Radio</legend>
				<InputRadioCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Radio (hideLabel)</legend>
				<InputRadioCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
