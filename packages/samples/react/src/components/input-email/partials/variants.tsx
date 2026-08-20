import React, { forwardRef } from 'react';

import { InputEmailCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputEmailVariants = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="email" heading="Email">
				<InputEmailCases {...props} />
			</SampleBlock>
			<SampleBlock id="email-hide-label" heading="Email (hideLabel)">
				<InputEmailCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
