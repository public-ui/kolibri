import React, { forwardRef } from 'react';

import { SelectCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const SelectVariants = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleBlock id="text" heading="Text">
				<SelectCases {...props} />
			</SampleBlock>
			<SampleBlock id="text-hide-label" heading="Text (hideLabel)">
				<SelectCases ref={ref} {...props} _hideLabel />
			</SampleBlock>
		</SampleColumns>
	);
});
