import React, { forwardRef } from 'react';

import { InputNumberCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputNumberVariants = forwardRef<HTMLKolInputNumberElement, Components.KolInputNumber>(function InputNumberVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="number" heading="Number">
				<InputNumberCases {...props} />
			</SampleBlock>
			<SampleBlock id="number-hide-label" heading="Number (hideLabel)">
				<InputNumberCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
