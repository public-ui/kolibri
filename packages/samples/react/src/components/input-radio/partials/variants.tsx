import React, { forwardRef } from 'react';

import { InputRadioCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';

export const InputRadioVariants = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Radio">
				<InputRadioCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Radio (hideLabel)">
				<InputRadioCases blockIdPrefix="hide-label" snapshotOnly="error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
