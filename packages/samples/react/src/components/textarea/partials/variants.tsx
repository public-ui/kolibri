import React, { forwardRef } from 'react';

import { TextareaCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
export const TextareaVariants = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset data-visual-block="text">
				<legend>Text</legend>
				<TextareaCases {...props} />
			</fieldset>
			<fieldset data-visual-block="text-hide-label">
				<legend>Text (hideLabel)</legend>
				<TextareaCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
