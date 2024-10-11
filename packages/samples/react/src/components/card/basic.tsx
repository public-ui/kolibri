import React from 'react';

import { KolCard } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolCard shows a card with title and slot content. The second sample features a close button.</p>
		</SampleDescription>

		<div className="w-full grid grid-cols-2 gap-4">
			<KolCard _label="Card with title and content">
				<div>Card contents.</div>
			</KolCard>

			<KolCard _label="Card with closer" _hasCloser>
				<p>This card has a close button.</p>
			</KolCard>
		</div>
	</>
);
