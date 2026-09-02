import React, { useMemo } from 'react';

import { KolLinkButton } from '@public-ui/react-v19';

import type { FC } from 'react';
import { useSearchParams } from 'react-router';
import { useAlert } from '../../hooks/useAlert';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getCustomThemes } from '../../shares/store';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const LinkButtonBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getCustomThemes()?.[0]?.key;
	const data = useMemo(() => (theme ? fetchVariantData(theme, 'buttonVariants') : []), [theme]);

	const { dummyClickEventHandler } = useAlert();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};
	return (
		<>
			<SampleDescription>
				<p>KolLinkButton renders a link that looks like a button. The sample shows the different theme exclusive styling variants.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="variants">
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return (
									<KolLinkButton _href="#/back-page" _icons="kolicon-house" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} />
								);
							})
						)}
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return (
									<KolLinkButton
										_href="#/back-page"
										_hideLabel
										_icons="kolicon-settings"
										_label={`${element}`}
										_variant={element}
										key={element}
										_on={dummyEventHandler}
									/>
								);
							})
						)}
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
