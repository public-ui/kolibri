import React, { forwardRef } from 'react';

import { SelectCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const SelectVariants = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="Text">
				<SelectCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="Text (hideLabel)">
				<SelectCases blockIdPrefix="hide-label" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
