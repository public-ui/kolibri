import React, { forwardRef } from 'react';

import { InputDateCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { InputDateMinMaxCases } from './minMax';
export const InputDateVariants = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset data-visual-block="date">
				<legend>Date</legend>
				<InputDateCases {...props} />
			</fieldset>
			<fieldset data-visual-block="date-hide-label">
				<legend>Date (hideLabel)</legend>
				<InputDateCases ref={ref} {...props} _hideLabel />
			</fieldset>
			<fieldset data-visual-block="date-min-max">
				<legend>Date (with min/max)</legend>
				<InputDateMinMaxCases {...props} />
			</fieldset>
		</SampleColumns>
	);
});
