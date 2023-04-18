import React from 'react';
import { KolHeading } from '@public-ui/react';

import { FC } from 'react';

export const HeadingBasic: FC = () => (
	<div className="grid gap-4">
		<KolHeading _headline="Ich bin eine H1-Überschrift" _level={1} />
		<KolHeading _headline="Ich bin eine H2-Überschrift" _level={2} />
		<KolHeading _headline="Ich bin eine H3-Überschrift" _level={3} />
		<KolHeading _headline="Ich bin eine H4-Überschrift" _level={4} />
		<KolHeading _headline="Ich bin eine H5-Überschrift" _level={5} />
		<KolHeading _headline="Ich bin eine H6-Überschrift" _level={6} />
	</div>
);
