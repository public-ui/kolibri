import React, { forwardRef } from 'react';

import { InputPasswordCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputPasswordVariants = forwardRef<HTMLKolInputPasswordElement, Components.KolInputPassword>(function InputPasswordVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="password" heading="Password">
				<InputPasswordCases {...props} />
			</SampleBlock>
			<SampleBlock id="password-hide-label" heading="Password (hideLabel)">
				<InputPasswordCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
