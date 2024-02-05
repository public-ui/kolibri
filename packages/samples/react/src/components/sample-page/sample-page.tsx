import { KolButton, KolHeading } from '@public-ui/react';
import React from 'react';

import type { FC } from 'react';

export const SamplePage: FC = () => (
	<>
		<div className="mb-4">
			<KolHeading _label="This is the example page" _level={2} />
		</div>
		<p>You followed an example link.</p>
		{history.length > 1 && (
			<KolButton
				_label="Go Back"
				_on={{
					onClick: () => {
						history.back();
					},
				}}
			/>
		)}
	</>
);
