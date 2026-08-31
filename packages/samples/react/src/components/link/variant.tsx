import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KolLink } from '@public-ui/react-v19';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getTheme } from '../../shares/store';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const LinkVariant: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getTheme();
	const data = useMemo(() => (theme ? fetchVariantData(theme, 'linkVariants') : []), [theme]);

	return (
		<>
			<SampleDescription>
				<p>This sample shows the theme specific variants of KolLink.</p>
			</SampleDescription>

			<SampleBlock id="variants">
				<KolLink _href="#/back-page" _label="Normal link without a variant" />
				{!Array.isArray(data) || data.length === 0 ? (
					<p>This theme has no variants for this component.</p>
				) : (
					data.map((element) => {
						return <KolLink _href="#/back-page" _label={`Theme exclusive variant: ${element}`} _variant={element} key={element} />;
					})
				)}
			</SampleBlock>
		</>
	);
};
