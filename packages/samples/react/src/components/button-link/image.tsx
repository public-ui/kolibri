import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with slot-content instead of a label. The sample uses an image as content.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolButtonLink _label="I am a link that is rendered as text" />
			<KolButtonLink _label="">
				<img alt="Presentation of the KoliBri theming" slot="expert" src="abgrenzung.jpg" width="300" />
			</KolButtonLink>
		</div>
	</>
);
