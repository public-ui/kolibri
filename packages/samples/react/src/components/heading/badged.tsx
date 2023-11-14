import React from 'react';
import { KolBadge, KolHeading } from '@public-ui/react';

import { FC } from 'react';

export const HeadingBadged: FC = () => (
	<div className="grid gap-4">
		<KolHeading _label="" _level={1}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#f00" _label="Label"></KolBadge>
			</span>
		</KolHeading>
		<KolHeading _label="" _level={2}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#0f0" _label="Label"></KolBadge>
			</span>
		</KolHeading>
		<KolHeading _label="" _level={3}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#00f" _label="Label"></KolBadge>
			</span>
		</KolHeading>
		<KolHeading _label="" _level={4}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#800080" _label="Label"></KolBadge>
			</span>
		</KolHeading>
		<KolHeading _label="" _level={5}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#ff0" _label="Label"></KolBadge>
			</span>
		</KolHeading>
		<KolHeading _label="" _level={6}>
			<span slot="expert">
				Eine Überschrift mit einem <KolBadge _color="#ffc0cb" _label="Label"></KolBadge>
			</span>
		</KolHeading>
	</div>
);
