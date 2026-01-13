import React from 'react';

import { KolLink } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolLink with icons in different alignments and combinations.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _icons="fa-solid fa-house" _label="I am a link with an icon on the left" _href="#/back-page" />
			<KolLink
				_icons={{
					right: 'fa-solid fa-house',
				}}
				_label="I am a link with an icon on the right"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'fa-solid fa-house',
				}}
				_label="I am a link with an icon at the top"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					bottom: 'fa-solid fa-house',
				}}
				_label="I am a link with icon below"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'fa-solid fa-house',
					right: 'fa-solid fa-house',
					bottom: 'fa-solid fa-house',
					left: 'fa-solid fa-house',
				}}
				_label="I am a link with all icons"
				_href="#/back-page"
			/>

			<KolLink _icons="fa-solid fa-house" _href="https://public-ui.github.io/" _label="I am a external link with an icon on the left" _target="_blank" />
			<KolLink
				_icons={{
					right: 'fa-solid fa-house',
				}}
				_href="https://public-ui.github.io/"
				_label="I am a external linkwith an icon on the right"
				_target="_blank"
			/>
			<KolLink
				_icons={{
					top: 'fa-solid fa-house',
				}}
				_href="https://public-ui.github.io/"
				_label="I am a external link with an icon at the top"
				_target="_blank"
			/>
			<KolLink
				_icons={{
					bottom: 'fa-solid fa-house',
				}}
				_href="https://public-ui.github.io/"
				_label="I am a external link with icon below"
				_target="_blank"
			/>
			<KolLink
				_href="https://public-ui.github.io/"
				_label="I am a external link with all icons"
				_target="_blank"
				_icons={{
					top: 'fa-solid fa-house',
					right: 'fa-solid fa-house',
					bottom: 'fa-solid fa-house',
					left: 'fa-solid fa-house',
				}}
			/>
		</div>
	</>
);
