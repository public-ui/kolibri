import React, { forwardRef } from 'react';

import { TextareaCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const TextareaVariants = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Text">
				<TextareaCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Text (hideLabel)">
				<TextareaCases blockIdPrefix="hide-label" snapshotOnly="error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
