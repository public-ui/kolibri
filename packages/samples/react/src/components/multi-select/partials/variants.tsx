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
					onChange: (event) => {
						setValue1(event.target.value as string[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (vorausgewählt)"
				_options={OPTIONS}
				_value={value2}
				_on={{
					onChange: (event) => {
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
					onChange: (event) => {
						setValue3(event.target.value as string[]);
					},
				}}
			/>

			<KolMultiSelect
				_label="Anrede (ohne Clear-Button)"
				_options={OPTIONS}
				_value={value4}
				_hideClearButton={true}
				_on={{
					onChange: (event) => {
						setValue4(event.target.value as string[]);
					},
				}}
			/>

			<div className="mt-4 p-4 bg-gray-100 rounded">
				<h3 className="text-lg font-bold mb-2">Aktuelle Werte:</h3>
				<p>
					<strong>Leer:</strong> {JSON.stringify(value1)}
				</p>
				<p>
					<strong>Vorausgewählt:</strong> {JSON.stringify(value2)}
				</p>
				<p>
					<strong>Max. 2:</strong> {JSON.stringify(value3)}
				</p>
				<p>
					<strong>Ohne Clear-Button:</strong> {JSON.stringify(value4)}
				</p>
			</div>
		</div>
	);
};
