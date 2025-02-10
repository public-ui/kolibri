import React, { forwardRef } from 'react';

import { InputTextCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const InputTextVariants = forwardRef<HTMLKolInputTextElement, Components.KolInputText>(function InputTextVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>Text</legend>
				<InputTextCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<InputTextCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
