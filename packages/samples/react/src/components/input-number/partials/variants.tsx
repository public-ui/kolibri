import React, { forwardRef } from 'react';

import { InputNumberCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputNumberVariants = forwardRef<HTMLKolInputNumberElement, Components.KolInputNumber>(function InputNumberVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Number</legend>
				<InputNumberCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Number (hideLabel)</legend>
				<InputNumberCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
