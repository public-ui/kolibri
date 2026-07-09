import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToasterService } from '../../hooks/useToasterService';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getCustomThemes } from '../../shares/store';
import { SampleDescription } from '../SampleDescription';

export const ButtonVariants: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getCustomThemes()?.[0]?.key;
	const data = useMemo(() => (theme ? fetchVariantData(theme, 'buttonVariants') : []), [theme]);

	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This story showcases all available button variants: primary, secondary, tertiary, normal, danger, and ghost.</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="All theme exclusive button variants" />
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return <KolButton _icons="kolicon-house" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} />;
							})
						)}
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return <KolButton _hideLabel _icons="kolicon-settings" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} />;
							})
						)}
					</div>
				</section>
			</div>
		</>
	);
};
