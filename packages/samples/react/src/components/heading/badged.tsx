import React from 'react';
import { KolBadge, KolHeading } from '@public-ui/react';

import { FC } from 'react';

export const HeadingBadged: FC = () => (
	<div className="grid gap-4">
		<KolHeading _label="" _level={1}>
			Eine Überschrift mit einem <KolBadge _color="#f00" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _label="" _level={2}>
			Eine Überschrift mit einem <KolBadge _color="#0f0" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _label="" _level={3}>
			Eine Überschrift mit einem <KolBadge _color="#00f" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _label="" _level={4}>
			Eine Überschrift mit einem <KolBadge _color="#800080" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _label="" _level={5}>
			Eine Überschrift mit einem <KolBadge _color="#ff0" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _label="" _level={6}>
			Eine Überschrift mit einem <KolBadge _color="#ffc0cb" _label="Label"></KolBadge>
		</KolHeading>
	</div>
);
