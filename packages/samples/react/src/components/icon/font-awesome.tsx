import React from 'react';

import { KolIcon, KolInputText } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconFontAwesome: FC = () => (
	<>
		<SampleDescription>
			<p>KolIcon renders Font Awesome icons, if you have added this font to your theme. We are showing Font Awesome Free 6.1.1.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolIcon className="block" _label="" _icons="fa-solid fa-house"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-solid fa-circle-user"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-solid fa-truck"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-solid fa-city"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-solid fa-heart"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-solid fa-thumbs-up"></KolIcon>
			<KolIcon className="block" _label="" _icons="fa-brands fa-github"></KolIcon>

			<KolInputText
				_label={'With Font Awesome icons'}
				_icons={{
					left: {
						icon: 'fa-solid fa-phone',
					},
					right: {
						icon: 'fa-solid fa-arrow-right',
					},
				}}
			/>
		</div>
	</>
);
