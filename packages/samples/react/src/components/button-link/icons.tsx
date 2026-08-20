import React from 'react';

import { KolButtonLink } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with icons in different locations.</p>
		</SampleDescription>

		<div className="grid gap-4" data-visual-block="icons">
			<KolButtonLink _icons="kolicon-house" _label="I am a link with an icon on the left" />
			<KolButtonLink
				_icons={{
					right: 'kolicon-house',
				}}
				_label="I am a link with an icon on the right"
			/>
			<KolButtonLink
				_icons={{
					top: 'kolicon-house',
				}}
				_label="I am a link with an icon at the top"
			/>
			<KolButtonLink
				_icons={{
					bottom: 'kolicon-house',
				}}
				_label="I am a link with icon below"
			/>
			<KolButtonLink
				_icons={{
					top: 'kolicon-house',
					right: 'kolicon-house',
					bottom: 'kolicon-house',
					left: 'kolicon-house',
				}}
				_label="I am a link with all icons"
			/>
			<KolButtonLink _icons="kolicon-house" _hideLabel _label="I am a link with icon only" />
		</div>
	</>
);
