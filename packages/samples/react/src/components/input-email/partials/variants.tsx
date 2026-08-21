import React, { forwardRef } from 'react';

import { InputEmailCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputEmailVariants = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Email">
				<InputEmailCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Email (hideLabel)">
				<InputEmailCases blockIdPrefix="hide-label" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
