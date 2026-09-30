import React, { useEffect, useState } from 'react';

import { KolAlert, KolIcon } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconAllKolicons: FC = () => {
	const [icons, setIcons] = useState<object>({});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch('assets/kolicons/kolicons.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to load kolicons: ${response.status} ${response.statusText}`.trim());
				}
				return response.json();
			})
			.then((data) => {
				setIcons(data);
			})
			.catch((err: unknown) => {
				const message = err instanceof Error ? err.message : 'Failed to load kolicons';
				setError(message);
				console.error('Failed to load kolicons:', err);
			});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows all kolicons with their names.</p>
			</SampleDescription>

			{error && <KolAlert _alert _type="error" _label={error} />}

			<div className="grid grid-cols-2 gap-8 p-8">
				{Object.entries(icons).map(([key]) => {
					return (
						<div className="flex gap-4" key={key}>
							<KolIcon _label={`Icon ${key}`} _icons={'kolicon-' + key} />
							<span>kolicon-{key}</span>
						</div>
					);
				})}
			</div>
		</>
	);
};
