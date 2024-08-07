import { KolButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonAriaDescription: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButton with aria-description</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-4">
			<KolButton _label="Button Text without area description"></KolButton>
			<KolButton _label="Button Text" _ariaDescription="Button Area Description"></KolButton>
		</div>
	</>
);
