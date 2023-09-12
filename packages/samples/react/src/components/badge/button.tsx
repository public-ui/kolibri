import React from 'react';
import { KolBadge } from '@public-ui/react';

import { FC } from 'react';

const PROPS = {
	_label: 'Label',
	_smartButton: {
		_icon: 'codicon codicon-close',
		_label: 'Entfernen',
		_on: {
			onClick: () => alert('clicked'),
		},
	},
};

export const BadgeButton: FC = () => (
	<div className="d-flex gap-2">
		<KolBadge {...PROPS}></KolBadge>
		<KolBadge _color="#B22222" {...PROPS}></KolBadge>
		<KolBadge _color="#4682B4" {...PROPS}></KolBadge>
		<KolBadge _color="#228B22" {...PROPS}></KolBadge>
		<KolBadge _color="#8B008B" {...PROPS}></KolBadge>
	</div>
);
