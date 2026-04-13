import React, { useEffect, useState } from 'react';

import { KolButton, KolIcon, KolInputText } from '@public-ui/react-v19';

import type { FC } from 'react';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { SampleDescription } from '../SampleDescription';

export const IconFont: FC = () => {
	const [iconVariants, setIconVariants] = useState<Array<string>>([]);
	const [iconVariantsButton, setIconVariantsButton] = useState<Array<string>>([]);
	const [iconVariantsInput, setIconVariantsInput] = useState<Array<string>>([]);

	useEffect(() => {
		const theme = document.body.dataset.theme;
		if (!theme) {
			return;
		}
		fetchVariantData(theme, 'iconVariants').then((response: string[]) => {
			setIconVariants(response);
		});
		fetchVariantData(theme, 'iconVariantsButton').then((response: string[]) => {
			setIconVariantsButton(response);
		});
		fetchVariantData(theme, 'iconVariantsInput').then((response: string[]) => {
			setIconVariantsInput(response);
		});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>KolIcon renders different icon fonts depending on your theme.</p>
			</SampleDescription>

			<div className="grid grid-cols-2 gap-8 p-8">
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
			<div className="grid grid-cols-2 gap-8 p-8">
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
			<div className="grid gap-8 p-8">
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
