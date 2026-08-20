import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<SampleColumns>
				<fieldset data-visual-block="label-left">
					<legend>Label align &quot;left&quot; with label</legend>
					<InputCheckboxCases {...props} _labelAlign="left" />
				</fieldset>
				<fieldset data-visual-block="label-left-hide-label">
					<legend>Label align &quot;left&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel _labelAlign="left" />
				</fieldset>
			</SampleColumns>
			<SampleColumns>
				<fieldset data-visual-block="label-right">
					<legend>Label align &quot;right&quot; with label</legend>
					<InputCheckboxCases {...props} />
				</fieldset>
				<fieldset data-visual-block="label-right-hide-label">
					<legend>Label align &quot;right&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel />
				</fieldset>
			</SampleColumns>
		</>
	);
});
