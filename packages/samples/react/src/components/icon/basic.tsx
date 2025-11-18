import React from 'react';

import { KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolIcon renders codicon icons. This sample shows regular icons and one with a custom style-property, changing the icon color.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolIcon className="block" _label="" _icons="codicon codicon-home" />
			<KolIcon className="block" _label="" _icons="codicon codicon-compass-active" />
			<KolIcon className="block" _label="" _icons="codicon codicon-debug" />
			<KolIcon className="block" _label="" _icons="codicon codicon-squirrel" />

			<KolIcon
				className="block w-[1em] h-[1em]"
				style={{
					color: 'red',
				}}
				_label=""
				_icons="codicon codicon-home"
			/>
		</div>
	</>
);
