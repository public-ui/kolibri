import React from 'react';
import { KolBadge, KolHeading } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

const createBadgeProps = (label: string) => ({
	_smartButton: {
		_icons: 'codicon codicon-close',
		_label: `Entfernen von ${label}`,
		_on: {
			onClick: () => alert('clicked'),
		},
	},
});

export const BadgeButton: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolBadge with an optional <code>smartButton</code>. The sample defines a &quot;close&quot; button with X-icon a click event listener.
			</p>
		</SampleDescription>

		<div className="mb-4">
			<KolHeading _label="Badge" _level={2} />
		</div>
		<div className="flex gap-2">
			<KolBadge _label="schwarz" {...createBadgeProps('schwarz')}></KolBadge>
			<KolBadge _label="türkis" _color="#86ffc6" {...createBadgeProps('türkis')}></KolBadge>
			<KolBadge _label="blau" _color="#06539e" {...createBadgeProps('blau')}></KolBadge>
			<KolBadge _label="rot" _color="#ae0000" {...createBadgeProps('rot')}></KolBadge>
			<KolBadge _label="lila" _color="#8b008b" {...createBadgeProps('lila')}></KolBadge>
		</div>
	</>
);
