import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolBadge } from '@public-ui/react-v19';

export const FormattedLabel = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates the possibility of formatted text in badges via markdown syntax.</p>
			</SampleDescription>

			<div className="flex flex-col gap-4">
				<KolBadge _color="#7db4ebff" _label="**Bold** and _italic_ Markdown label" />
				<KolBadge _color="#8feb7dff" _label="This is ~~strikethrough~~ text" />
				<KolBadge _color="#e6ee8eff" _label="Source code like `y = mx + n` is possible" />
			</div>
		</>
	);
};
