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
			<KolIcon className="block" _label="Alert Info Icon" _icons="kolicon-alert-info" />
			<KolIcon className="block" _label="Kolibri Icon" _icons="kolicon-kolibri" />
			<KolIcon className="block" _label="House Icon" _icons="kolicon-house" />
			<KolIcon className="block" _label="Settings Icon" _icons="kolicon-settings" />

			<KolIcon
				className="block w-[1em] h-[1em]"
				style={{
					color: 'red',
				}}
				_label="House Icon"
				_icons="kolicon-house"
			/>

			<KolIcon className="block" _label="Plus Icon" _icons="codicon codicon-plus" />
		</div>
	</>
);
