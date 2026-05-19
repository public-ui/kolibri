import { KolInputColor, KolInputDate, KolInputPassword, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { fetchVariantData } from '../../shares/fetchVariantData';
import { getCustomThemes } from '../../shares/store';
import { SampleDescription } from '../SampleDescription';

export const InputVariant: FC = () => {
	const [searchParams] = useSearchParams();
	const theme = searchParams.get('theme') ?? getCustomThemes()?.[0]?.key;
	const inputVariants = useMemo(() => (theme ? fetchVariantData(theme, 'inputVariants') : []), [theme]);

	return (
		<>
			<SampleDescription>
				<p>This story showcases input variants depending on your choosen theme.</p>
			</SampleDescription>

			<div className="grid grid-cols-2 gap-8 p-8">
				{!Array.isArray(inputVariants) || inputVariants.length === 0 ? (
					<p>This theme has no variants for inputs.</p>
				) : (
					inputVariants.map((element) => {
						return (
							<div>
								<p>Variante: {element}</p>
								<KolInputText _label="Input Text" _hint="Enter your surname" _variant={element} />
								<KolInputPassword _label="Input Passwort" _variant={element} />
								<KolInputColor _label="Input Color" _variant={element} />
								<KolInputDate _label="Input Date" _variant={element} />
							</div>
						);
					})
				)}
			</div>
		</>
	);
};
