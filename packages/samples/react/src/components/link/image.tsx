import React from 'react';
import { KolKolibri, KolLink } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>KolLink can be used with slot-content instead of a label as well. This sample demonstrates the slot content used to display an image.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="Ich bin ein Link, der als Text gerendert wird" />
			<br />
			<KolLink _href="#/back-page" _label="">
				<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
				<KolKolibri style={{ width: '300px' }}></KolKolibri>
			</KolLink>
			<br />
			<KolLink _href="#/back-page" _label="">
				<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
			</KolLink>
		</div>
	</>
);
