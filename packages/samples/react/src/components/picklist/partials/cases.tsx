import React, { useState } from 'react';

import { KolButton, KolSelect } from '@public-ui/react-v19';

import type { SelectOption } from '@public-ui/components';

const FRUITS: SelectOption<string>[] = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
	{ label: 'Date', value: 'date' },
	{ label: 'Elderberry', value: 'elderberry' },
	{ label: 'Fig', value: 'fig' },
	{ label: 'Grape', value: 'grape' },
	{ label: 'Honeydew', value: 'honeydew' },
	{ label: 'Kiwi', value: 'kiwi' },
	{ label: 'Lemon', value: 'lemon' },
	{ label: 'Mango', value: 'mango' },
	{ label: 'Orange', value: 'orange' },
];

type PicklistProps = {
	label?: string;
	disabled?: boolean;
};

const Picklist = ({ label = 'Picklist', disabled = false }: PicklistProps) => {
	const [available, setAvailable] = useState<SelectOption<string>[]>(FRUITS);
	const [selected, setSelected] = useState<SelectOption<string>[]>([]);
	const [availableSelection, setAvailableSelection] = useState<string[]>([]);
	const [selectedSelection, setSelectedSelection] = useState<string[]>([]);

	const moveToSelected = () => {
		const toMove = available.filter((opt) => availableSelection.includes(opt.value as string));
		setSelected((prev) => [...prev, ...toMove]);
		setAvailable((prev) => prev.filter((opt) => !availableSelection.includes(opt.value as string)));
		setAvailableSelection([]);
	};

	const moveAllToSelected = () => {
		setSelected((prev) => [...prev, ...available]);
		setAvailable([]);
		setAvailableSelection([]);
		setSelectedSelection([]);
	};

	const moveToAvailable = () => {
		const toMove = selected.filter((opt) => selectedSelection.includes(opt.value as string));
		setAvailable((prev) => [...prev, ...toMove].sort((a, b) => (a.label as string).localeCompare(b.label as string)));
		setSelected((prev) => prev.filter((opt) => !selectedSelection.includes(opt.value as string)));
		setSelectedSelection([]);
	};

	const moveAllToAvailable = () => {
		setAvailable((prev) => [...prev, ...selected].sort((a, b) => (a.label as string).localeCompare(b.label as string)));
		setSelected([]);
		setAvailableSelection([]);
		setSelectedSelection([]);
	};

	return (
		<div>
			<p className="font-bold mb-2">{label}</p>
			<div className="flex gap-4 items-center">
				<KolSelect
					_label="Available"
					_options={available}
					_value={availableSelection}
					_multiple
					_disabled={disabled}
					style={{ width: '200px' }}
					_on={{
						onChange: (_e, value) => setAvailableSelection(value as string[]),
					}}
				/>
				<div className="flex flex-col gap-2">
					<KolButton
						_label="Add selected"
						_icons="kolicon-chevron-right"
						_hideLabel
						_variant="primary"
						_disabled={disabled || availableSelection.length === 0}
						_on={{ onClick: moveToSelected }}
						_tooltipAlign="top"
					/>
					<KolButton
						_label="Add all"
						_icons="kolicon-chevrons-right"
						_hideLabel
						_variant="secondary"
						_disabled={disabled || available.length === 0}
						_on={{ onClick: moveAllToSelected }}
						_tooltipAlign="top"
					/>
					<KolButton
						_label="Remove selected"
						_icons="kolicon-chevron-left"
						_hideLabel
						_variant="secondary"
						_disabled={disabled || selectedSelection.length === 0}
						_on={{ onClick: moveToAvailable }}
						_tooltipAlign="top"
					/>
					<KolButton
						_label="Remove all"
						_icons="kolicon-chevrons-left"
						_hideLabel
						_variant="tertiary"
						_disabled={disabled || selected.length === 0}
						_on={{ onClick: moveAllToAvailable }}
						_tooltipAlign="top"
					/>
				</div>
				<KolSelect
					_label="Selected"
					_options={selected}
					_value={selectedSelection}
					_multiple
					_disabled={disabled}
					style={{ width: '200px' }}
					_on={{
						onChange: (_e, value) => setSelectedSelection(value as string[]),
					}}
				/>
			</div>
		</div>
	);
};

export const PicklistCases = () => (
	<div className="grid gap-8">
		<Picklist label="Basic picklist" />
		<Picklist label="Disabled picklist" disabled />
	</div>
);
