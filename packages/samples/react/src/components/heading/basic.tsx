import React from 'react';

import { KolHeading } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const HeadingBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolHeading renders a heading with the given level.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolHeading _label="I'm a H1-heading" _level={1} />
			<KolHeading _label="I'm a H2-heading" _level={2} />
			<KolHeading _label="I'm a H3-heading" _level={3} />
			<KolHeading _label="I'm a H4-heading" _level={4} />
			<KolHeading _label="I'm a H5-heading" _level={5} />
			<KolHeading _label="I'm a H6-heading" _level={6} />
		</div>
	</>
);
