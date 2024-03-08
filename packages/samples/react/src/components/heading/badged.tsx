import React from 'react';

import { KolBadge, KolHeading } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const HeadingBadged: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden sechs verschiedene Überschriften mit unterschiedlichen Leveln und Label-Farben dargestellt. Es gibt keine Interaktionsmöglichkeit.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolHeading _label="" _level={1}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _label="Label"></KolBadge>
				</span>
			</KolHeading>
			<KolHeading _label="" _level={2}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _color="#86ffc6" _label="Label"></KolBadge>
				</span>
			</KolHeading>
			<KolHeading _label="" _level={3}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _color="#06539e" _label="Label"></KolBadge>
				</span>
			</KolHeading>
			<KolHeading _label="" _level={4}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _color="#ae0000" _label="Label"></KolBadge>
				</span>
			</KolHeading>
			<KolHeading _label="" _level={5}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _color="#8b008b" _label="Label"></KolBadge>
				</span>
			</KolHeading>
			<KolHeading _label="" _level={6}>
				<span slot="expert">
					Eine Überschrift mit einem <KolBadge _color="#ffc0cb" _label="Label"></KolBadge>
				</span>
			</KolHeading>
		</div>
	</>
);
