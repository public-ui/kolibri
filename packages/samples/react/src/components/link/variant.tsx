import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { KolLink } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const LinkVariant: FC = () => {
	const [data, setData] = useState<Array<string>>([]);

	useEffect(() => {
		const theme = document.body.dataset.theme;
		if (!theme) {
			return;
		}
		fetch('/assets/variants/inject-variants_' + theme + '.json')
			.then((response) => response.json())
			.then((data) => {
				if (data.hasOwnProperty('linkVariants')) {
					setData(data.linkVariants);
				}
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows the theme specific variants of KolLink.</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolLink _href="#/back-page" _label="Normal link without a variant" />
				{!Array.isArray(data) || data.length === 0 ? (
					<p>This theme has no variants for this component.</p>
				) : (
					data.map((element) => {
						return (
							<div className="flex gap-4" key={element}>
								<KolLink _href="#/back-page" _label={`Theme exclusive variant: ${element}`} _variant={element} />
							</div>
						);
					})
				)}
			</div>
		</>
	);
};
