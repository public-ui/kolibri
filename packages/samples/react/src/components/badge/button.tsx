import React from 'react';
import { KolBadge } from '@public-ui/react';

import { FC } from 'react';

const PROPS = {
	_smartButton: {
		_icons: 'codicon codicon-close',
		_label: 'Entfernen',
		_on: {
			onClick: () => alert('clicked'),
		},
	},
};

export const BadgeButton: FC = () => (
	<div className="flex gap-2">
		<KolBadge _label="schwarz" {...PROPS}></KolBadge>
		<KolBadge _label="türkis" _color="#86ffc6" {...PROPS}></KolBadge>
		<KolBadge _label="blau" _color="#06539e" {...PROPS}></KolBadge>
		<KolBadge _label="rot" _color="#ae0000" {...PROPS}></KolBadge>
		<KolBadge _label="lila" _color="#8b008b" {...PROPS}></KolBadge>
	</div>
);
