import React, { useState } from 'react';
import type { FC } from 'react';
import { KolMultiSelect } from '@public-ui/react';

const OPTIONS = [
	{ label: 'Frau', value: 'Frau' },
	{ label: 'Herr', value: 'Herr' },
	{ label: 'Divers', value: 'Divers' },
	{ label: 'Dr.', value: 'Dr.' },
	{ label: 'Prof.', value: 'Prof.' },
	{ label: 'Prof. Dr.', value: 'Prof. Dr.' },
];

export const MultiSelectVariants: FC = () => {
	const [value1, setValue1] = useState<string[]>([]);
	const [value2, setValue2] = useState<string[]>(['Herr', 'Frau']);
	const [value3, setValue3] = useState<string[]>([]);
	const [value4, setValue4] = useState<string[]>([]);

	return (
		<div className="grid gap-4">
			<KolMultiSelect
				_label="Anrede (leer)"
				_options={OPTIONS}
				_value={value1}
				_on={{
					onChange: (event: React.MouseEvent) => {
						const target = event.target;
						if (target) {
							setValue1(event.target.value as string[]);
						}
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (vorausgewählt)"
				_options={OPTIONS}
				_value={value2}
				_on={{
					onChange: (event: React.MouseEvent) => {
						setValue2(event.target.value as string[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (max. 2 Auswahlen)"
				_options={OPTIONS}
				_value={value3}
				_maxSelections={2}
				_on={{
					onChange: (event: React.MouseEvent) => {
						const target = event.target;
						if (target) {
							setValue3(event.target.value as string[]);
						}
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (ohne Clear-Button)"
				_options={OPTIONS}
				_value={value4}
				_hideClearButton={true}
				_on={{
					onChange: (event: React.MouseEvent) => {
						const target = event.target;
						if (target) {
							setValue4(event.target.value as string[]);
						}
					},
				}}
			/>
		</div>
	);
};
