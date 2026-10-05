import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const ITEMS = ['Quarterly report', 'Meeting notes', 'Travel expenses'];

export const ButtonPinToggle: FC = () => {
	const [pinned, setPinned] = useState<string[]>(['Meeting notes']);

	const toggle = (item: string) => setPinned((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));

	return (
		<>
			<SampleDescription>
				<p>
					This story shows a button toggling between the two pin icons, <code>kolicon-pin-pinned</code> and <code>kolicon-pin-unpinned</code>. Icon and label
					change together, so the current state is conveyed visually as well as to screen readers.
				</p>
			</SampleDescription>

			<SampleBlock id="pin-toggle" heading="Pin and unpin items" fitContent>
				<ul className="grid gap-2 list-none m-0 p-0">
					{ITEMS.map((item) => {
						const isPinned = pinned.includes(item);
						return (
							<li className="flex gap-2 items-center" key={item}>
								<KolButton
									_hideLabel
									_icons={isPinned ? 'kolicon-pin-pinned' : 'kolicon-pin-unpinned'}
									_label={isPinned ? `Unpin ${item}` : `Pin ${item}`}
									_on={{ onClick: () => toggle(item) }}
								/>
								<span>{item}</span>
							</li>
						);
					})}
				</ul>
			</SampleBlock>
		</>
	);
};
