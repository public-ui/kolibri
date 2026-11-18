import React from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const CardImage: FC = () => {
	const image = {
		uri: 'assets/sample-image.png',
		alt: 'KoliBri design system illustration showing three people working on laptops surrounded by UI components, charts, and the KoliBri hummingbird logo',
	};

	return (
		<>
			<SampleDescription>
				<p>KolCard can have an image.</p>
			</SampleDescription>

			<SampleBlock id="basic" className="w-full grid grid-cols-2 gap-4" narrow>
				<KolCard _label="Card with title and content" _image={image}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with closer" _hasCloser _image={image}>
					<p>This card has a close button.</p>
				</KolCard>

				<KolCard _label="Card with title and content" _href="#/back-page" _image={image}>
					<p>This card has a link.</p>
				</KolCard>
			</SampleBlock>
		</>
	);
};
