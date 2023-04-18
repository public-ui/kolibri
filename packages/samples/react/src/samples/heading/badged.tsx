import React from 'react';
import { KolBadge, KolHeading } from '@public-ui/react';

import { FC } from 'react';

export const HeadingBadged: FC = () => (
	<div className="grid gap-4">
		<KolHeading _headline="" _level={1}>
			Eine Überschrift mit einem <KolBadge _color="red" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _headline="" _level={2}>
			Eine Überschrift mit einem <KolBadge _color="green" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _headline="" _level={3}>
			Eine Überschrift mit einem <KolBadge _color="blue" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _headline="" _level={4}>
			Eine Überschrift mit einem <KolBadge _color="purple" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _headline="" _level={5}>
			Eine Überschrift mit einem <KolBadge _color="yellow" _label="Label"></KolBadge>
		</KolHeading>
		<KolHeading _headline="" _level={6}>
			Eine Überschrift mit einem <KolBadge _color="pink" _label="Label"></KolBadge>
		</KolHeading>
	</div>
);
