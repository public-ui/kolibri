import React, { forwardRef } from 'react';

import { InputDateCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
import { InputDateMinMaxCases } from './minMax';
export const InputDateVariants = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Date">
				<InputDateCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Date (hideLabel)">
				<InputDateCases blockIdPrefix="hide-label" snapshotOnly="datetime-seconds" ref={ref} {...props} _hideLabel />
			</SampleGroup>
			<SampleGroup heading="Date (with min/max)">
				<InputDateMinMaxCases blockIdPrefix="min-max" {...props} />
			</SampleGroup>
		</SampleColumns>
	);
});
