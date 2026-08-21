import React, { forwardRef } from 'react';

import { InputRangeCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputRangeVariants = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Range">
				<InputRangeCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Range (hideLabel)">
				<InputRangeCases blockIdPrefix="hide-label" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
