import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden verschiedene Links mit Icons angezeigt. Die Links führen zu keinem Ziel.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolButtonLink _icons="codicon codicon-home" _label="Ich bin ein Link mit Icon links" />
			<KolButtonLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon rechts"
			/>
			<KolButtonLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon oben"
			/>
			<KolButtonLink
				_icons={{
					bottom: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon unten"
			/>
			<KolButtonLink
				_icons={{
					top: 'codicon codicon-home',
					right: 'codicon codicon-home',
					bottom: 'codicon codicon-home',
					left: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit allen Icons"
			/>
		</div>
	</>
);
