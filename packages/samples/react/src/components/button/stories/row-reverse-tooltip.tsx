import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../../SampleDescription';

export const ButtonStoryRowReverseTooltip: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates how the tooltip adapts its width when containing long text inside a row-reverse flex container. The effect becomes visible
					when inspecting the layout with DevTools and reducing the available width (e.g., by narrowing the screen).
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Button in Row-Reverse Container" />
					<div className="flex flex-row-reverse">
						<KolButton _icons="codicon codicon-home" _hideLabel _label="This is a very, very long tooltip text that exceeds the width." _variant="primary" />
					</div>
				</section>
			</div>
		</>
	);
};
