import { KolButtonLink } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkAriaDescription: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with aria-description</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-4">
			<KolButtonLink _label="Button Text without area description"></KolButtonLink>
			<KolButtonLink _label="Button Text" _ariaDescription="Button Area Description"></KolButtonLink>
		</div>
	</>
);
