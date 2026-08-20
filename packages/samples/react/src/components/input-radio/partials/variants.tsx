import React, { forwardRef } from 'react';

import { InputRadioCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';

export const InputRadioVariants = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="radio" heading="Radio">
				<InputRadioCases {...props} />
			</SampleBlock>
			<SampleBlock id="radio-hide-label" heading="Radio (hideLabel)">
				<InputRadioCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
