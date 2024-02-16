import React from 'react';

import { KolLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind verschiedene Darstellungsweisen von Links mit Icons.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _icons="codicon codicon-home" _label="Ich bin ein Link mit Icon links" _href="#/back-page" />
			<KolLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon rechts"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon oben"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					bottom: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon unten"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
					right: 'codicon codicon-home',
					bottom: 'codicon codicon-home',
					left: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit allen Icons"
				_href="#/back-page"
			/>
		</div>
	</>
);
