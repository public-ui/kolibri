import React, { forwardRef } from 'react';

import { SampleColumns } from '../../SampleColumns';
import { InputFileCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputFileVariants = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props, ref) {
	return (
		<SampleColumns>
			<fieldset>
				<legend>File</legend>
				<InputFileCases {...props} />
			</fieldset>
			<fieldset>
				<legend>File (hideLabel)</legend>
				<InputFileCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</SampleColumns>
	);
});
