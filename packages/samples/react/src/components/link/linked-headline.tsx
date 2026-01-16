import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolLink } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const LinkHeadline: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows a linked headline with anchor.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _href="/#/link/linked-headline#headline2" _label="">
				<KolHeading _label="I'm a H2-heading" _level={2} slot="expert" id="headline2" />
			</KolLink>
		</div>
	</>
);
