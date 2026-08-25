import React, { forwardRef } from 'react';

import { InputNumberCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputNumberVariants = forwardRef<HTMLKolInputNumberElement, Components.KolInputNumber>(function InputNumberVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Number">
				<InputNumberCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Number (hideLabel)">
				<InputNumberCases blockIdPrefix="hide-label" snapshotOnly="msg-error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
