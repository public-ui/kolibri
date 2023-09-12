import React from 'react';
import { KolLink } from '@public-ui/react';

import { FC } from 'react';

export const LinkIcons: FC = () => (
	<div className="grid gap-4">
		<KolLink _icon="codicon codicon-home" _label="Ich bin ein Link mit Icon links" />
		<KolLink
			_icon={{
				right: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon rechts"
		/>
		<KolLink
			_icon={{
				top: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon oben"
		/>
		<KolLink
			_icon={{
				bottom: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon unten"
		/>
		<KolLink
			_icon={{
				top: 'codicon codicon-home',
				right: 'codicon codicon-home',
				bottom: 'codicon codicon-home',
				left: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit allen Icons"
		/>
	</div>
);
