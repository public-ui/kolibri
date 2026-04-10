import React, { useEffect, useState } from 'react';

import { KolIcon, KolInputText } from '@public-ui/react-v19';

import type { FC } from 'react';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { SampleDescription } from '../SampleDescription';

export const IconFontAwesome: FC = () => {
	const [iconVariants, setIconVariants] = useState<Array<string>>([]);

	useEffect(() => {
		const theme = document.body.dataset.theme;
		if (!theme) {
			return;
		}
		fetchVariantData(theme, 'iconVariants').then((response: string[]) => {
			setIconVariants(response);
		});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>KolIcon renders Font Awesome icons, if you have added this font to your theme. We are showing Font Awesome Free 6.1.1.</p>
			</SampleDescription>

			<div className="grid gap-4">
				{!Array.isArray(iconVariants) || iconVariants.length === 0 ? (
					<p>This theme has no variants for this component.</p>
				) : (
					iconVariants.map((element) => {
						return <KolIcon className="block" _label="" _icons={element} key={element}></KolIcon>;
					})
				)}

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
};
