import {
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
} from '@public-ui/react-v19';
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
							<div key={element} className="grid gap-4 p-8">
								<h2>Variante: {element}</h2>
								<KolInputText _label="Input Text" _hint="Enter your surname" _variant={element} />
								<KolInputPassword _label="Input Passwort" _variant={element} />
								<KolInputColor _label="Input Color" _variant={element} />
								<KolInputDate _label="Input Date" _variant={element} />
								<KolInputEmail _label="Input Email" _variant={element} />
								<KolInputFile _label="Input File" _variant={element} />
								<KolInputNumber _label="Input Number" _variant={element} />
								<KolInputRange _label="Input Range" _variant={element} />
								<KolSelect
									_label="Select"
									_options={[
										{ label: 'Please select…', value: '' },
										{ label: 'One', value: 'one' },
										{ label: 'Two', value: 'two' },
									]}
									_variant={element}
								/>
								<KolSingleSelect
									_label="Single Select"
									_options={[
										{ label: 'One', value: 'one' },
										{ label: 'Two', value: 'two' },
									]}
									_variant={element}
								/>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};
