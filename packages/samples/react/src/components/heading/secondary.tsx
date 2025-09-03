import React from 'react';

import { KolHeading } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const HeadingSecondary: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolHeading with the prop <code>_secondaryHeadline</code> in use.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolHeading _label="This is a H1 headline" _secondaryHeadline="This is a secondary headline" _level={1} />
		</div>
	</>
);
