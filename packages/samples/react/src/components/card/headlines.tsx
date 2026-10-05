import React from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const CardHeadlines: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows cards with all headline levels as title.</p>
			</SampleDescription>

			<SampleBlock id="headlines" className="w-full grid grid-cols-2 gap-4">
				<KolCard _label="Card with headline level 0" _level={0}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 1" _level={1}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 2" _level={2}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 3" _level={3}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 4" _level={4}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 5" _level={5}>
					<p>Card contents.</p>
				</KolCard>

				<KolCard _label="Card with headline level 6" _level={6}>
					<p>Card contents.</p>
				</KolCard>
			</SampleBlock>
		</>
	);
};
