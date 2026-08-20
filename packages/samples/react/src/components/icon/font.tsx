import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KolButton, KolIcon, KolInputText } from '@public-ui/react-v19';

import type { FC } from 'react';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getCustomThemes } from '../../shares/store';
import { SampleDescription } from '../SampleDescription';

export const IconFont: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getCustomThemes()?.[0]?.key;
	const iconVariants = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariants') : []), [theme]);
	const iconVariantsButton = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariantsButton') : []), [theme]);
	const iconVariantsInput = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariantsInput') : []), [theme]);

	return (
		<>
			<SampleDescription>
				<p>KolIcon renders different icon fonts depending on your theme.</p>
			</SampleDescription>

			<div className="grid grid-cols-2 gap-8 p-8" data-visual-block="icons">
				{!Array.isArray(iconVariants) || iconVariants.length === 0 ? (
					<p>This theme has no variants for icons.</p>
				) : (
					iconVariants.map((element) => {
						return (
							<div className="flex gap-4" key={element}>
								<KolIcon _label="" _icons={element} />
								<span>&lt;KolIcon _icons='{element}' _label="" /&gt;</span>
							</div>
						);
					})
				)}
			</div>
			<div className="grid grid-cols-2 gap-8 p-8" data-visual-block="buttons">
				{!Array.isArray(iconVariantsButton) || iconVariantsButton.length === 0 ? (
					<p>This theme has no variants for icons in buttons.</p>
				) : (
					iconVariantsButton.map((element) => {
						return (
							<div className="flex gap-4 items-center" key={element}>
								<KolButton _icons={element} _label="Button" _variant="primary" />
								<span>&lt;KolButton _icons='{element}' _label="Button" _variant="primary" /&gt;</span>
							</div>
						);
					})
				)}
			</div>
			<div className="grid gap-8 p-8" data-visual-block="inputs">
				{!Array.isArray(iconVariantsInput) || iconVariantsInput.length === 0 ? (
					<p>This theme has no variants for icons in inputs.</p>
				) : (
					iconVariantsInput.map((element) => {
						return (
							<div className="flex gap-4 items-center" key={element}>
								<KolInputText _icons={element} _label="Input with Icon" />
								<span>&lt;KolInputText _icons='{element}' _label="Input with Icon" /&gt;</span>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};
