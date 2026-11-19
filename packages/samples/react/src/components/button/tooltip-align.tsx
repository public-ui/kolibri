import React from 'react';

import { KolButton, KolLink } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { AlignPropType } from '@public-ui/components';
import type { FC } from 'react';

const ALIGNMENTS: AlignPropType[] = ['top', 'right', 'bottom', 'left'];

export const ButtonTooltipAlign: FC = () => (
	<>
		<SampleDescription>
			<p>
				With a hidden label, the label is shown as tooltip on hover and focus. <code>_tooltipAlign</code> places it on one of the four sides. A button places it
				on top by default, a link on the right.
			</p>
			<p>Hover or focus the elements to see the tooltips.</p>
		</SampleDescription>

		<SampleBlock id="tooltip-align" className="grid grid-cols-2 gap-16 p-16 justify-items-center" skipSnapshot>
			{ALIGNMENTS.map((align) => (
				<KolButton key={align} _label={`Tooltip ${align}`} _icons="kolicon-alert-info" _hideLabel _tooltipAlign={align} />
			))}
			<KolButton _label="Button with default (top)" _icons="kolicon-check" _hideLabel />
			<KolLink _label="Link with default (right)" _icons="kolicon-link" _hideLabel _href="#/back-page" />
		</SampleBlock>
	</>
);
