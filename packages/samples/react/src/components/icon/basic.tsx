import React, { useEffect, useState } from 'react';

import { KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconBasic: FC = () => {
	const [icons, setIcons] = useState<{}>({});

	useEffect(() => {
		fetch('/assets/kolicons/kolicons.json')
			.then((response) => response.json())
			.then((data) => {
				setIcons(data);
			});
	});

	return (
		<>
			<SampleDescription>
				<p>KolIcon renders kolicon icons. This sample shows all kolicons and the last one with a custom style-property, changing the icon color and size.</p>
			</SampleDescription>

			<div className="grid grid-cols-2 gap-8 p-8">
				{Object.entries(icons).map(([key]) => {
					return (
						<div className="flex gap-4">
							<KolIcon _label="" _icons={'kolicon-' + key} />
							<span>{key}</span>
						</div>
					);
				})}
			</div>

			<div className="grid gap-4 p-8">
				<KolIcon
					className="block"
					style={{
						color: 'red',
						fontSize: '40px',
					}}
					_label=""
					_icons="kolicon-house"
				/>
			</div>
		</>
	);
};
