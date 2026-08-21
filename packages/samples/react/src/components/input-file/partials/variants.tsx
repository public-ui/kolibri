import React, { forwardRef } from 'react';

import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
import { InputFileCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputFileVariants = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="File">
				<InputFileCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="File (hideLabel)">
				<InputFileCases blockIdPrefix="hide-label" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
