import React from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const CardImage: FC = () => (
	<>
		<SampleDescription>
			<p>KolCard can have an image.</p>
		</SampleDescription>

		<SampleBlock id="basic" className="w-full grid grid-cols-2 gap-4" narrow>
			<KolCard _label="Card with title and content" _image="assets/sample-image.png">
				<p>Card contents.</p>
			</KolCard>

			<KolCard _label="Card with closer" _hasCloser _image="assets/sample-image.png">
				<p>This card has a close button.</p>
			</KolCard>

			<KolCard _label="Card with title and content" _href="#/back-page" _image="assets/sample-image.png">
				<p>This card has a link.</p>
			</KolCard>
		</SampleBlock>
	</>
);
