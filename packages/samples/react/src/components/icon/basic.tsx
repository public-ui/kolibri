import React from 'react';

import { KolIcon } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden zwei verschiedene Icons in unterschiedlichen Farben angezeigt. Es gibt keine Interaktionsmöglichkeit.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolIcon _label="" _icons="codicon codicon-home" />
			<KolIcon
				style={{
					color: 'red',
				}}
				_label=""
				_icons="codicon codicon-home"
			/>
		</div>
	</>
);
