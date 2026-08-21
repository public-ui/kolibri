import React from 'react';

import { KolBadge } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const BadgeBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolBadge shows badges with a label, background color and optional icon. The label supports markdown syntax and the badge can host an optional{' '}
				<code>smartButton</code> &ndash; here a &quot;remove&quot; button with X-icon and a click event listener.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<SampleBlock id="basic-vertical" heading="Basic Badges vertical" className="flex flex-col gap-2" fitContent>
				<KolBadge _label="black (default)"></KolBadge>
				<KolBadge _color="#06539e" _label="blue"></KolBadge>
				<KolBadge _color="#ae0000" _label="red with icon" _icons="kolicon-house"></KolBadge>
				<KolBadge _color="#8b008b" _label="purple with icon" _icons="kolicon-kolibri"></KolBadge>
			</SampleBlock>

			<SampleBlock id="basic-horizontal" heading="Basic Badges horizontal" className="flex flex-wrap gap-2" fitContent>
				<KolBadge _label="black"></KolBadge>
				<KolBadge _color="#06539e" _label="blue"></KolBadge>
				<KolBadge _color="#ae0000" _label="red with icon" _icons="kolicon-kolibri"></KolBadge>
			</SampleBlock>

			<SampleBlock id="smart-button" heading="Badges with Smart Button" className="flex flex-col gap-2" fitContent>
				<KolBadge
					_color="#06539e"
					_label="blue"
					_smartButton={{
						_ariaDescription: 'blue',
						_icons: 'kolicon-cross',
						_label: 'Remove',
						_on: { onClick: () => alert('clicked') },
					}}
				></KolBadge>
				<KolBadge
					_color="#8b008b"
					_icons="kolicon-kolibri"
					_label="purple with icon"
					_smartButton={{
						_ariaDescription: 'purple with icon',
						_icons: 'kolicon-cross',
						_label: 'Remove',
						_on: { onClick: () => alert('clicked') },
					}}
				></KolBadge>
			</SampleBlock>

			<SampleBlock id="formatted-label" heading="Formatted Label" className="flex flex-col gap-2" fitContent>
				<KolBadge _color="#7db4ebff" _label="**Bold** and _italic_ Markdown label" />
				<KolBadge _color="#8feb7dff" _label="This is ~~strikethrough~~ text" />
				<KolBadge _color="#e6ee8eff" _label="Source code like `y = mx + n` is possible" />
			</SampleBlock>
		</div>
	</>
);
