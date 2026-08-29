import React from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const CardLinked: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolCards with links. The headline is wrapped with an a-tag. The whole card is clickable.</p>
			</SampleDescription>

			<SampleBlock id="linked" className="w-full grid grid-cols-2 gap-4">
				<KolCard _label="Card with title and content" _href="#/back-page">
					<p>This card has a link.</p>
				</KolCard>

				<KolCard _label="Card with title and content" _href="#/back-page" _target="_blank">
					<p>This card has a link and a target.</p>
				</KolCard>
			</SampleBlock>
		</>
	);
};
