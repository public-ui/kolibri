import React, { forwardRef } from 'react';

import { InputDateCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
import { InputDateMinMaxCases } from './minMax';
export const InputDateVariants = forwardRef<HTMLKolInputDateElement, Components.KolInputDate>(function InputDateVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="date" heading="Date">
				<InputDateCases {...props} />
			</SampleBlock>
			<SampleBlock id="date-hide-label" heading="Date (hideLabel)">
				<InputDateCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
			<SampleBlock id="date-min-max" heading="Date (with min/max)">
				<InputDateMinMaxCases {...props} />
			</SampleBlock>
		</SampleColumns>
	);
});
