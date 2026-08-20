import React, { forwardRef } from 'react';

import { InputRangeCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputRangeVariants = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="range" heading="Range">
				<InputRangeCases {...props} />
			</SampleBlock>
			<SampleBlock id="range-hide-label" heading="Range (hideLabel)">
				<InputRangeCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
