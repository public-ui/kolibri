import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KolButton, KolIcon, KolInputText } from '@public-ui/react-v19';

import type { FC } from 'react';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getTheme } from '../../shares/store';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const IconFont: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getTheme();
	const iconVariants = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariants') : []), [theme]);
	const iconVariantsButton = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariantsButton') : []), [theme]);
	const iconVariantsInput = useMemo(() => (theme ? fetchVariantData(theme, 'iconVariantsInput') : []), [theme]);

	/* Themes without variants only render the fallback text – there is nothing theme specific to snapshot. */
	const hasIconVariants = Array.isArray(iconVariants) && iconVariants.length > 0;
	const hasIconVariantsButton = Array.isArray(iconVariantsButton) && iconVariantsButton.length > 0;
	const hasIconVariantsInput = Array.isArray(iconVariantsInput) && iconVariantsInput.length > 0;

	return (
		<>
			<SampleDescription>
				<p>KolIcon renders different icon fonts depending on your theme.</p>
			</SampleDescription>

			<SampleBlock id="icons" className="grid grid-cols-2 gap-8 p-8" skipSnapshot={!hasIconVariants}>
				{!hasIconVariants ? (
					<p>This theme has no variants for icons.</p>
				) : (
					iconVariants.map((element) => {
						return (
							<div className="flex gap-4" key={element}>
								<KolIcon _label={element} _icons={element} />
								<span>
									&lt;KolIcon _icons='{element}' _label="{element}" /&gt;
								</span>
							</div>
						);
					})
				)}
			</SampleBlock>
			<SampleBlock id="buttons" className="grid grid-cols-2 gap-8 p-8" skipSnapshot={!hasIconVariantsButton}>
				{!hasIconVariantsButton ? (
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
			</SampleBlock>
			<SampleBlock id="inputs" className="grid gap-8 p-8" skipSnapshot={!hasIconVariantsInput}>
				{!hasIconVariantsInput ? (
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
			</SampleBlock>
		</>
	);
};
