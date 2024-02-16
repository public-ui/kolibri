import React, { forwardRef } from 'react';

import { TextareaCases } from './cases';

import type { Components } from '@public-ui/components';
export const TextareaVariants = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<TextareaCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<TextareaCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
