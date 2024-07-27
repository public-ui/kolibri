import React from 'react';
import { KolButtonLink } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with slot-content instead of a label. The sample uses an image as content.</p>
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
