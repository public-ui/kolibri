import { KolLinkButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkButtonTarget: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolLinkButton with diffrent Targets</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-2" data-visual-block="target">
			<KolLinkButton _href="#/back-page" _label="Link Button Target default"></KolLinkButton>
			<KolLinkButton _href="#/back-page" _label="Link Button Target _self" _target="_blank"></KolLinkButton>
			<KolLinkButton _href="#/back-page" _label="Link Button Target _blank" _target="_blank"></KolLinkButton>
		</div>
	</>
);
