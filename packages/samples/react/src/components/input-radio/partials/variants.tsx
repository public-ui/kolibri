import React, { forwardRef } from 'react';

import { InputRadioCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputRadioVariants = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Radio</legend>
				<InputRadioCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Radio (hideLabel)</legend>
				<InputRadioCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
