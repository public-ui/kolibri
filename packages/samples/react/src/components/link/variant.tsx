import type { FC } from 'react';
import React, { useMemo } from 'react';

import { KolLink } from '@public-ui/react-v19';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { SampleDescription } from '../SampleDescription';

export const LinkVariant: FC = () => {
	const theme = document.body.dataset.theme;
	const data = useMemo(() => (theme ? fetchVariantData(theme, 'linkVariants') : []), [theme]);

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
						return <KolLink _href="#/back-page" _label={`Theme exclusive variant: ${element}`} _variant={element} key={element} />;
					})
				)}
			</div>
		</>
	);
};
