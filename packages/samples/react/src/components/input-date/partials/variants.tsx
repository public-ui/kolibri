import React, { forwardRef } from 'react';

import { InputDateCases } from './cases';

import type { Components } from '@public-ui/components';
import { InputDateMinMaxCases } from './minMax';
import { SampleColumns } from '../../SampleColumns';
export const InputDateVariants = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Date</legend>
				<InputDateCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Date (hideLabel)</legend>
				<InputDateCases ref={ref} {...props} _hideLabel />
			</fieldset>
			<fieldset>
				<legend>Date (with min/max)</legend>
				<InputDateMinMaxCases {...props} />
			</fieldset>
		</SampleColumns>
	);
});
