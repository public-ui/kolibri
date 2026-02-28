import type { FC } from 'react';
import React from 'react';

import { KolImage, KolLink } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const LinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>KolLink can be used with slot-content instead of a label as well. This sample demonstrates the slot content used to display an image.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="I am a link that is rendered as text" />
			<KolLink _href="#/back-page" _label="">
				<KolImage _alt="KoliBri design system illustration showing three people working on laptops surrounded by UI components, charts, and the KoliBri hummingbird logo" _src="sample-image.png" slot="expert" style={{ width: '300px' }} />
			</KolLink>
		</div>
	</>
);
