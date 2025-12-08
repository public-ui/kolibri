import type { FC } from 'react';
import React from 'react';

import { KolBadge } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const createBadgeProps = (label: string) => ({
	_label: label,
	_smartButton: {
		_ariaDescription: label,
		_icons: 'codicon codicon-close',
		_label: `Remove`,
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

		<div className="flex flex-wrap gap-2">
			<KolBadge {...createBadgeProps('black')}></KolBadge>
			<KolBadge _color="#86ffc6" {...createBadgeProps('teal')}></KolBadge>
			<KolBadge _color="#06539e" {...createBadgeProps('blue')}></KolBadge>
			<KolBadge _color="#ae0000" _icons="codicon codicon-smiley" {...createBadgeProps('red with icon')}></KolBadge>
			<KolBadge _color="#8b008b" _icons="codicon codicon-squirrel" {...createBadgeProps('purple with icon')}></KolBadge>
		</div>
	</>
);
