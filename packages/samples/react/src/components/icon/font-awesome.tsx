import React from 'react';

import { KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconFontAwesome: FC = () => (
	<>
		<SampleDescription>
			<p>KolIcon renders FontAwesome icons, if you have installed this font.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolIcon className="block" _label="" _icons="fa-solid fa-house" />
		</div>
	</>
);
