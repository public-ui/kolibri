import React from 'react';

import { KolButtonLink } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with icons in different locations.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolButtonLink _icons="fa-solid fa-house" _label="I am a link with an icon on the left" />
			<KolButtonLink
				_icons={{
					right: 'fa-solid fa-house',
				}}
				_label="I am a link with an icon on the right"
			/>
			<KolButtonLink
				_icons={{
					top: 'fa-solid fa-house',
				}}
				_label="I am a link with an icon at the top"
			/>
			<KolButtonLink
				_icons={{
					bottom: 'fa-solid fa-house',
				}}
				_label="I am a link with icon below"
			/>
			<KolButtonLink
				_icons={{
					top: 'fa-solid fa-house',
					right: 'fa-solid fa-house',
					bottom: 'fa-solid fa-house',
					left: 'fa-solid fa-house',
				}}
				_label="I am a link with all icons"
			/>
			<KolButtonLink _icons="fa-solid fa-house" _hideLabel _label="I am a link with icon only" />
		</div>
	</>
);
