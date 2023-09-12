import React from 'react';
import { KolButtonLink } from '@public-ui/react';

import { FC } from 'react';

export const ButtonLinkIcons: FC = () => (
	<div className="grid gap-4">
		<KolButtonLink _icon="codicon codicon-home" _label="Ich bin ein Link mit Icon links" />
		<KolButtonLink
			_icon={{
				right: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon rechts"
		/>
		<KolButtonLink
			_icon={{
				top: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon oben"
		/>
		<KolButtonLink
			_icon={{
				bottom: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon unten"
		/>
		<KolButtonLink
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
