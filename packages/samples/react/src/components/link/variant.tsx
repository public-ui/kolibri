import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { KolLink } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const LinkVariant: FC = () => {
	const [data, setData] = useState<Array<string>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const theme = document.body.dataset.theme;
		if (!theme) {
			setLoading(false);
			return;
		}
		fetch('/assets/variants/inject-variants_' + theme + '.json')
			.then((response) => {
				if (response.status === 404) {
					// No variants file for this theme is an expected state.
					setData([]);
					return undefined;
				}
				if (!response.ok) {
					console.info('Error fetching variants: HTTP ' + response.status);
					return undefined;
				}
				return response.json();
			})
			.then((json) => {
				if (!json) {
					setData([]);
					return;
				}
				const linkVariants = (json as { linkVariants?: unknown }).linkVariants;
				if (Array.isArray(linkVariants)) {
					const variants = linkVariants.filter((item): item is string => typeof item === 'string');
					setData(variants);
				} else {
					setData([]);
				}
			})
			.catch((error) => {
				console.info('No theme variant file found or file could not be parsed', error);
				setData([]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows the theme specific variants of KolLink.</p>
				<p className={loading ? 'loading' : 'hidden'}>Loading Data</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolLink _href="#/back-page" _label="Normal link without a variant" />
				{!Array.isArray(data) || data.length === 0 ? (
					<p>This theme has no variants for this component.</p>
				) : (
					data.map((element) => {
						return <KolLink _href="#/back-page" _label={`Theme exclusive variant: ${element}`} _variant={element} key={element} />;
					})
				)}
			</div>
		</>
	);
};
