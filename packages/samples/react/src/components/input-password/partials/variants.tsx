import React, { forwardRef } from 'react';

import { InputPasswordCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputPasswordVariants = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Password">
				<InputPasswordCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Password (hideLabel)">
				<InputPasswordCases blockIdPrefix="hide-label" snapshotOnly="icons-error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
