import React, { forwardRef } from 'react';

import { InputColorCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputColorVariants = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Color">
				<InputColorCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Color (hideLabel)">
				<InputColorCases blockIdPrefix="hide-label" snapshotOnly="suggestions-error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
