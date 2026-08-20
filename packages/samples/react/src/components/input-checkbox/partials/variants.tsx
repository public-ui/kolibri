import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';
import { SampleColumns } from '../../SampleColumns';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<SampleColumns>
				<SampleBlock id="label-left" heading='Label align "left" with label'>
					<InputCheckboxCases {...props} _labelAlign="left" />
				</SampleBlock>
				<SampleBlock id="label-left-hide-label" heading='Label align "left" without Label (hideLabel)'>
					<InputCheckboxCases ref={ref} {...props} _hideLabel _labelAlign="left" />
				</SampleBlock>
			</SampleColumns>
			<SampleColumns>
				<SampleBlock id="label-right" heading='Label align "right" with label'>
					<InputCheckboxCases {...props} />
				</SampleBlock>
				<SampleBlock id="label-right-hide-label" heading='Label align "right" without Label (hideLabel)'>
					<InputCheckboxCases ref={ref} {...props} _hideLabel />
				</SampleBlock>
			</SampleColumns>
		</>
	);
});
