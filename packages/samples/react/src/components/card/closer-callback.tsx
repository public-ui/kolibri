import React, { useState } from 'react';

import { KolButton, KolCard } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const CardCloserCallback: FC = () => {
	const [open, setOpen] = useState(true);
	const [closeCount, setCloseCount] = useState(0);

	return (
		<>
			<SampleDescription>
				<p>
					The close button of KolCard calls <code>_on.onClose</code>. The card does not hide itself; the application decides what happens. Here the callback
					removes the card, and the button below brings it back.
				</p>
			</SampleDescription>

			<SampleBlock id="closer-callback" className="grid gap-4" skipSnapshot>
				{open ? (
					<KolCard
						_label="Card that closes itself"
						_hasCloser
						_on={{
							onClose: () => {
								setOpen(false);
								setCloseCount((count) => count + 1);
							},
						}}
					>
						<p>Click the close button to remove the card.</p>
					</KolCard>
				) : (
					<KolButton _label="Show the card again" _on={{ onClick: () => setOpen(true) }} />
				)}
				<p aria-live="polite">Closed {closeCount} time(s).</p>
			</SampleBlock>
		</>
	);
};
