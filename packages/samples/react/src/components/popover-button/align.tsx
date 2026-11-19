import { KolPopoverButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import type { AlignPropType } from '@public-ui/components';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const ALIGNMENTS: AlignPropType[] = ['top', 'right', 'bottom', 'left'];

export const PopoverButtonAlign: FC = () => (
	<>
		<SampleDescription>
			<p>
				<code>_popoverAlign</code> places the popover on one of the four sides of the button; the default is <code>bottom</code>. If there is not enough space,
				the popover moves to the opposite side.
			</p>
			<p>Open the buttons one after the other to compare the positions.</p>
		</SampleDescription>

		<SampleBlock id="popover-align" className="grid grid-cols-2 gap-32 p-32 justify-items-center" skipSnapshot>
			{ALIGNMENTS.map((align) => (
				<KolPopoverButton key={align} _label={`Popover ${align}`} _popoverAlign={align}>
					<p className="m-0 p-2 bg-white">
						Popover placed <strong>{align}</strong>.
					</p>
				</KolPopoverButton>
			))}
		</SampleBlock>
	</>
);
