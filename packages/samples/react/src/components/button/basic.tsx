import { KolButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useAlert } from '../../hooks/useAlert';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getTheme } from '../../shares/store';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const ButtonBasic: FC = () => {
	const { dummyClickEventHandler } = useAlert();

	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getTheme();
	const data = useMemo(() => (theme ? fetchVariantData(theme, 'buttonVariants') : []), [theme]);

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates the most important features of the KolButton component. It showcases the different button variants, icons, disabled state, and
					hidden labels. All available button variants for this theme are shown. You can import ButtonVariantsEnum from your theme to always use the right
					variants.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<SampleBlock id="variants" heading="Button Variants" fitContent>
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return <KolButton _icons="kolicon-house" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} />;
							})
						)}
					</div>
				</SampleBlock>

				<SampleBlock id="disabled" heading="Disabled State" fitContent>
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return <KolButton _icons="kolicon-house" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} _disabled />;
							})
						)}
					</div>
				</SampleBlock>

				<SampleBlock id="hide-label" heading="Hidden Label (Icon Only)" fitContent>
					<div className="flex flex-wrap gap-4 items-center">
						{!Array.isArray(data) || data.length === 0 ? (
							<p>This theme has no variants for this component.</p>
						) : (
							data.map((element) => {
								return <KolButton _hideLabel _icons="kolicon-settings" _label={`${element}`} _variant={element} key={element} _on={dummyEventHandler} />;
							})
						)}
					</div>
				</SampleBlock>

				<SampleBlock id="icon-positions" heading="Icon Positions" fitContent>
					<div className="flex flex-wrap gap-4">
						<KolButton
							_icons={{
								left: 'kolicon-chevron-left',
							}}
							_label="Icon Left"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								right: 'kolicon-chevron-right',
							}}
							_label="Icon Right"
							_on={dummyEventHandler}
						/>
						<KolButton
							_icons={{
								left: 'kolicon-chevron-left',
								right: 'kolicon-chevron-right',
							}}
							_label="Icons Both Sides"
							_on={dummyEventHandler}
						/>
					</div>
				</SampleBlock>
			</div>
		</>
	);
};
