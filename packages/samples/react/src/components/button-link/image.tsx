import React from 'react';

import { KolButtonLink, KolImage } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonLinkImage: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolButtonLink with slot-content instead of a label. The sample uses an image as content.</p>
		</SampleDescription>

		<SampleBlock id="image">
			<KolButtonLink _label="I am a link that is rendered as text" />
			<KolButtonLink _label="">
				<KolImage
					_alt="KoliBri design system illustration showing three people working on laptops surrounded by UI components, charts, and the KoliBri hummingbird logo"
					_src="sample-image.png"
					className="w-image"
					slot="expert"
				/>
			</KolButtonLink>
		</SampleBlock>
	</>
);
