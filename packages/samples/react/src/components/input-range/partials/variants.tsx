import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { InputRangeCases } from './cases';

export const InputRangeVariants = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Range</legend>
				<InputRangeCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Range (hideLabel)</legend>
				<InputRangeCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
