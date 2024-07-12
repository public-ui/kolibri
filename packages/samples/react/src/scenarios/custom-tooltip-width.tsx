import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

export const CustomTooltipWidth: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates how a tooltip&apos;s width can be adjusted by defining the CSS custom property <code>--kol-tooltip-width</code> on one of the
				parent elements.
			</p>
		</SampleDescription>

		<KolButton _label="Tooltip with fixed width" _hideLabel style={{ '--kol-tooltip-width': '400px' }} _icons="codicon codicon-reactions"></KolButton>
	</>
);
