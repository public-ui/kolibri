import React from 'react';

import { KolLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolLink with icons in different alignments and combinations.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _icons="codicon codicon-home" _label="I am a link with an icon on the left" _href="#/back-page" />
			<KolLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_label="I am a link with an icon on the right"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_label="I am a link with an icon at the top"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					bottom: 'codicon codicon-home',
				}}
				_label="I am a link with icon below"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
					right: 'codicon codicon-home',
					bottom: 'codicon codicon-home',
					left: 'codicon codicon-home',
				}}
				_label="I am a link with all icons"
				_href="#/back-page"
			/>

			<KolLink _icons="codicon codicon-home" _href="https://public-ui.github.io/" _label="I am a external link with an icon on the left" _target="_blank" />
			<KolLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_href="https://public-ui.github.io/"
				_label="I am a external linkwith an icon on the right"
				_target="_blank"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_href="https://public-ui.github.io/"
				_label="I am a external link with an icon at the top"
				_target="_blank"
			/>
			<KolLink
				_icons={{
					bottom: 'codicon codicon-home',
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
					top: 'codicon codicon-home',
					right: 'codicon codicon-home',
					bottom: 'codicon codicon-home',
					left: 'codicon codicon-home',
				}}
			/>
		</div>
	</>
);
