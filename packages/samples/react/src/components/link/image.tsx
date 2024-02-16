import React from 'react';

import { KolKolibri, KolLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Link, der als Text gerendert wird und zwei Darstellungen des KoliBri-Theming.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _href="#/sample-page" _label="Ich bin ein Link, der als Text gerendert wird" />
			<br />
			<KolLink _href="#/sample-page" _label="">
				<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
				<KolKolibri style={{ width: '300px' }}></KolKolibri>
			</KolLink>
			<br />
			<KolLink _href="#/sample-page" _label="">
				<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
			</KolLink>
		</div>
	</>
);
