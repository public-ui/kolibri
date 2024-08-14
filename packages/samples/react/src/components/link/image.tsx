import type { FC } from 'react';
import React from 'react';

import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const LinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>KolLink can be used with slot-content instead of a label as well. This sample demonstrates the slot content used to display an image.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="I am a link that is rendered as text" />
			<br />
			<KolLink _href="#/back-page" _label="">
				<img alt="Presentation of the KoliBri theming" slot="expert" src="abgrenzung.jpg" width="300" />
			</KolLink>
		</div>
	</>
);
