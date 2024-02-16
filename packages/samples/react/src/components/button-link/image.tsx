import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>Hier wird ein Link angezeigt, der als Text gerendert wird. Nach klicken auf den Link wird das Bild abgrenzung.jpg angezeigt.</p>
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
