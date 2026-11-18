import React, { forwardRef } from 'react';

import { SampleColumns } from '../../SampleColumns';
import { SampleGroup } from '../../SampleGroup';
import { InputFileCases, InputFileCasesDragnDrop } from './cases';

import type { Components } from '@public-ui/components';
export const InputFileVariants = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props, ref) {
	return (
		<SampleColumns>
			<SampleGroup heading="File">
				<InputFileCases blockIdPrefix="label" {...props} />
			</SampleGroup>
			<SampleGroup heading="File (hideLabel)">
				<InputFileCases blockIdPrefix="hide-label" snapshotOnly="error" ref={ref} {...props} _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});

export const InputFileVariantsDragnDrop = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileVariant(props) {
	return (
		<SampleColumns>
			<SampleGroup heading="File">
				<InputFileCasesDragnDrop blockIdPrefix="label" {...props} _accept=".pdf" />
			</SampleGroup>
			<SampleGroup heading="File (hideLabel)">
				<InputFileCasesDragnDrop blockIdPrefix="hide-label" snapshotOnly="error" {...props} _accept=".pdf" _hideLabel />
			</SampleGroup>
		</SampleColumns>
	);
});
