import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';

export const CustomTooltipWidth: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how a tooltip&apos;s width can be adjusted by defining the CSS custom property <code>--kol-tooltip-width</code> on one of the
					parent elements.
				</p>
			</SampleDescription>

			<KolButton
				_label="Tooltip with fixed width"
				_hideLabel
				style={{ '--kol-tooltip-width': '400px' }}
				_icons="codicon codicon-reactions"
				_on={dummyEventHandler}
			></KolButton>
		</>
	);
};
