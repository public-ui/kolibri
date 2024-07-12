import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>KolButtonLink can be used with slot-content instead of a label as well. This sample demonstrates the slot content used to display an image.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolButtonLink _label="Ich bin ein Link, der als Text gerendert wird" />
			<br />
			<KolButtonLink _label="">
				<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
			</KolButtonLink>
		</div>
	</>
);
