import React from 'react';

import { KolHeading } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const HeadingBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind sechs verschiedene Überschriften mit unterschiedlichen Leveln dargestellt. Es gibt keine Interaktionsmöglichkeit.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolHeading _label="Ich bin eine H1-Überschrift" _level={1} />
			<KolHeading _label="Ich bin eine H2-Überschrift" _level={2} />
			<KolHeading _label="Ich bin eine H3-Überschrift" _level={3} />
			<KolHeading _label="Ich bin eine H4-Überschrift" _level={4} />
			<KolHeading _label="Ich bin eine H5-Überschrift" _level={5} />
			<KolHeading _label="Ich bin eine H6-Überschrift" _level={6} />
		</div>
	</>
);
