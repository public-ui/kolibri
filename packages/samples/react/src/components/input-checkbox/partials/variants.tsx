import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<SampleColumns>
				<fieldset>
					<legend>Label align &quot;left&quot; with label</legend>
					<InputCheckboxCases {...props} _labelAlign="left" />
				</fieldset>
				<fieldset>
					<legend>Label align &quot;left&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel _labelAlign="left" />
				</fieldset>
			</SampleColumns>
			<SampleColumns>
				<fieldset>
					<legend>Label align &quot;right&quot; with label</legend>
					<InputCheckboxCases {...props} />
				</fieldset>
				<fieldset>
					<legend>Label align &quot;right&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel />
				</fieldset>
			</SampleColumns>
		</>
	);
});
