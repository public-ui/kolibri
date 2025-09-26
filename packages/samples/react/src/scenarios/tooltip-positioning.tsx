import type { FC } from 'react';
import React from 'react';
import { KolPopoverButton } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';

export const TooltipPositioning: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This example demonstrates tooltip positioning within container query contexts. Container queries can interfere with fixed positioning, causing
					tooltips to render incorrectly relative to the viewport. The layout containment fix ensures tooltips position properly even when their parent elements
					use container-based sizing and layout rules.
				</p>
			</SampleDescription>

			<div
				style={{
					container: 'test / size',
					contain: 'layout',
				}}
			>
				<KolPopoverButton _label="Sample PopoverButton—Click for Popover" _icons="codicon codicon-info" _tooltipAlign="right" _hideLabel>
					This is an explanation shown on click.
				</KolPopoverButton>
			</div>
		</>
	);
};
