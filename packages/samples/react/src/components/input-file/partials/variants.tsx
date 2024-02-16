import React, { forwardRef } from 'react';

import { InputFileCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputFileVariants = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>File</legend>
				<InputFileCases {...props} />
			</fieldset>
			<fieldset>
				<legend>File (hideLabel)</legend>
				<InputFileCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
