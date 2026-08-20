import React, { forwardRef } from 'react';

import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
import { InputFileCases } from './cases';

import type { Components } from '@public-ui/components';
export const InputFileVariants = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="file" heading="File">
				<InputFileCases {...props} />
			</SampleBlock>
			<SampleBlock id="file-hide-label" heading="File (hideLabel)">
				<InputFileCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
