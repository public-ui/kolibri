import { KolLinkButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkButtonAriaDescription: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolLinkButton with aria-description</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-4">
			<KolLinkButton _href="#/back-page" _label="Link Button Text without area description"></KolLinkButton>
			<KolLinkButton _href="#/back-page" _label="Link Button Text" _ariaDescription="Link Button Area Description"></KolLinkButton>
		</div>
	</>
);
