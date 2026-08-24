import { KolButtonLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkAriaDescription: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with aria-description</p>
		</SampleDescription>

		<SampleBlock id="aria-description" className="flex flex-wrap gap-4">
			<KolButtonLink _label="Button Text without area description"></KolButtonLink>
			<KolButtonLink _label="Button Text" _ariaDescription="Button Area Description"></KolButtonLink>
		</SampleBlock>
	</>
);
