import React from 'react';

import { KolButtonLink, KolImage } from '@public-ui/react-v19';

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
				<KolImage _alt="KoliBri design system illustration showing three people working on laptops surrounded by UI components, charts, and the KoliBri hummingbird logo" _src="sample-image.png" slot="expert" style={{ width: '300px' }} />
			</KolButtonLink>
		</div>
	</>
);
