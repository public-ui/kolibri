import React, { forwardRef } from 'react';

import { InputCheckboxCases } from './cases';

import type { Components } from '@public-ui/components';
import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
export const InputCheckboxVariants = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxVariant(props, ref) {
	return (
		<>
			<SampleColumns>
				<SampleGroup heading='Label align "left" with label'>
					<InputCheckboxCases blockIdPrefix="left" {...props} _labelAlign="left" />
				</SampleGroup>
				<SampleGroup heading='Label align "left" without Label (hideLabel)'>
					<InputCheckboxCases blockIdPrefix="left-hide" snapshotOnly="error" ref={ref} {...props} _hideLabel _labelAlign="left" />
				</SampleGroup>
			</SampleColumns>
			<SampleColumns>
				<SampleGroup heading='Label align "right" with label'>
					<InputCheckboxCases blockIdPrefix="right" {...props} />
				</SampleGroup>
				<SampleGroup heading='Label align "right" without Label (hideLabel)'>
					<InputCheckboxCases blockIdPrefix="right-hide" snapshotOnly="error" ref={ref} {...props} _hideLabel />
				</SampleGroup>
			</SampleColumns>
		</>
	);
});
