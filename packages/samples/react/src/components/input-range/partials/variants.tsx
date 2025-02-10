import React, { forwardRef } from 'react';

import { InputRangeCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputRangeVariants = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Range</legend>
				<InputRangeCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Range (hideLabel)</legend>
				<InputRangeCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
