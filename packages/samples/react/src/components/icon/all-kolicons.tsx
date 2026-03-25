import React, { useEffect, useState } from 'react';

import { KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconAllKolicons: FC = () => {
	const [icons, setIcons] = useState<object>({});

	useEffect(() => {
		fetch('/assets/kolicons/kolicons.json')
			.then((response) => response.json())
			.then((data) => {
				setIcons(data);
			});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows all kolicons with their names.</p>
			</SampleDescription>

			<div className="grid grid-cols-2 gap-8 p-8">
				{Object.entries(icons).map(([key]) => {
					return (
						<div className="flex gap-4" key={key}>
							<KolIcon _label="" _icons={'kolicon-' + key} />
							<span>kolicon-{key}</span>
						</div>
					);
				})}
			</div>
		</>
	);
};
