import React from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardHeadlines: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows cards with all headline levels as title.</p>
			</SampleDescription>

			<div className="w-full grid grid-cols-2 gap-4">
				<KolCard _label="Card with headline level 0" _level={0}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 1" _level={1}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 2" _level={2}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 3" _level={3}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 4" _level={4}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 5" _level={5}>
					<div>Card contents.</div>
				</KolCard>

				<KolCard _label="Card with headline level 6" _level={6}>
					<div>Card contents.</div>
				</KolCard>
			</div>
		</>
	);
};
