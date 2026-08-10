import React, { useEffect } from 'react';

import { KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CardLinked: FC = () => {
	const cardRef = React.useRef<HTMLKolCardElement | null>(null);

	useEffect(() => {
		// Ensure the popover is closed on initial render
		if (cardRef.current) {
			cardRef.current.focus();
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>KolCard shows a card with title and slot content. The second sample features a close button.</p>
			</SampleDescription>

			<div className="w-full grid grid-cols-2 gap-4">
				<KolCard
					_label="Card with title and content"
					_href="#/back-page"
					ref={cardRef}
					onBlur={() => console.log('outer blur')}
					onFocus={() => console.log('outer focus')}
				>
					<p>This card has a link.</p>
				</KolCard>

				<KolCard _label="Card with title and content" _href="#/back-page" _target="_blank">
					<p>This card has a link and a target.</p>
				</KolCard>
			</div>
		</>
	);
};
