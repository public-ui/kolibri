import React from 'react';
import { KolBadge, KolHeading } from '@public-ui/react';

import { FC } from 'react';

const createBadgePROPS = (label: String) => ({
	_smartButton: {
		_icons: 'codicon codicon-close',
		_label: `Entfernen von ${label}`,
		_on: {
			onClick: () => alert('clicked'),
		},
	},
});

export const BadgeButton: FC = () => (
	<div>
		<div className="mb-4">
			<KolHeading _label="Badge" _level={2} />
		</div>
		<div className="flex gap-2">
			<KolBadge _label="schwarz" {...createBadgePROPS('schwarz')}></KolBadge>
			<KolBadge _label="türkis" _color="#86ffc6" {...createBadgePROPS('türkis')}></KolBadge>
			<KolBadge _label="blau" _color="#06539e" {...createBadgePROPS('blau')}></KolBadge>
			<KolBadge _label="rot" _color="#ae0000" {...createBadgePROPS('rot')}></KolBadge>
			<KolBadge _label="lila" _color="#8b008b" {...createBadgePROPS('lila')}></KolBadge>
		</div>
	</div>
);
