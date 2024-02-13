import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';

export const ButtonLinkImage: FC = () => (
	<div className="grid gap-4">
		<KolButtonLink _label="Ich bin ein Link, der als Text gerendert wird" />
		<br />
		<KolButtonLink _label="">
			<img alt="Darstellung des KoliBri-Theming" slot="expert" src="abgrenzung.jpg" width="300" />
		</KolButtonLink>
	</div>
);
