import React, { forwardRef } from 'react';

import { TextareaCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const TextareaVariants = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="text" heading="Text">
				<TextareaCases {...props} />
			</SampleBlock>
			<SampleBlock id="text-hide-label" heading="Text (hideLabel)">
				<TextareaCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
