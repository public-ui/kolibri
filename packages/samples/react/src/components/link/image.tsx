import React from 'react';
import { KolKolibri, KolLink } from '@public-ui/react';

import { FC } from 'react';

export const LinkImage: FC = () => (
	<div className="grid gap-4">
		<KolLink _href="#" _label="Ich bin ein Link, der als Text gerendert wird" />
		<br />
		<KolLink _href="#" _label="">
			<img alt="Abgrenzung" slot="expert" src="https://public-ui.github.io/assets/abgrenzung.jpg" width="300" />
			<KolKolibri style={{ width: '300px' }}></KolKolibri>
		</KolLink>
		<br />
		<KolLink _href="#" _label="">
			<img alt="Abgrenzung" slot="expert" src="https://public-ui.github.io/assets/abgrenzung.jpg" width="300" />
		</KolLink>
	</div>
);
