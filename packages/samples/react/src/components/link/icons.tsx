import React from 'react';
import { KolLink } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind verschiedene Darstellungsweisen von Links mit Icons.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _icons="codicon codicon-home" _label="Ich bin ein Link mit Icon links" />
			<KolLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon rechts"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon oben"
			/>
			<KolLink
				_icons={{
					bottom: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon unten"
			/>
			<KolLink
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
