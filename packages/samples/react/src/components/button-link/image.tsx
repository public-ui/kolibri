import React from 'react';
import { KolButtonLink } from '@public-ui/react';

import { FC } from 'react';

export const ButtonLinkImage: FC = () => (
	<div className="grid gap-4">
		<KolButtonLink _label="Ich bin ein Link, der als Text gerendert wird" />
		<br />
		<KolButtonLink _label="">
			<img alt="Abgrenzung" slot="expert" src="https://public-ui.github.io/assets/abgrenzung.jpg" width="300" />
		</KolButtonLink>
	</div>
);
