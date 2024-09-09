import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<div className="grid md:grid-cols-2 gap-4">
				<fieldset>
					<legend>Label algin &quot;left&quot; with label</legend>
					<InputCheckboxCases {...props} _labelAlign="left" />
				</fieldset>
				<fieldset>
					<legend>Label align &quot;left&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel _labelAlign="left" />
				</fieldset>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				<fieldset>
					<legend>Label algin &quot;right&quot; with label</legend>
					<InputCheckboxCases {...props} />
				</fieldset>
				<fieldset>
					<legend>Label align &quot;right&quot; without Label (hideLabel)</legend>
					<InputCheckboxCases ref={ref} {...props} _hideLabel />
				</fieldset>
			</div>
		</>
	);
});
