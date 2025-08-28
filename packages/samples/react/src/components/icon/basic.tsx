import React from 'react';

import { KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolIcon renders an icon. This sample shows one regular icon and one with a custom style-property, changing the icon color.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolIcon className="block w-[1em] h-[1em]" _label="" _icons="codicon codicon-home" />
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
