import React, { forwardRef } from 'react';

import { InputColorCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputColorVariants = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="color" heading="Color">
				<InputColorCases {...props} />
			</SampleBlock>
			<SampleBlock id="color-hide-label" heading="Color (hideLabel)">
				<InputColorCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
