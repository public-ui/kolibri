import React, { useState } from 'react';

import type { PicklistOption } from '../Picklist';
import { Picklist } from '../Picklist';

// ── Sample data ──────────────────────────────────────────────────────────────

const FRUITS: PicklistOption<string>[] = [
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

type Permission = { id: number; name: string };

const PERMISSIONS: PicklistOption<number>[] = [
	{ label: 'Read', value: 1 },
	{ label: 'Write', value: 2 },
	{ label: 'Delete', value: 3 },
	{ label: 'Admin', value: 4 },
	{ label: 'Export', value: 5 },
	{ label: 'Import', value: 6 },
];

// ── Example: basic (uncontrolled) ────────────────────────────────────────────

export const PicklistBasicCase = () => <Picklist options={FRUITS} />;

// ── Example: with pre-selected items ─────────────────────────────────────────

export const PicklistPreselectedCase = () => (
	<Picklist options={FRUITS} defaultValue={['banana', 'mango', 'kiwi']} availableLabel="Fruits" selectedLabel="Basket" />
);

// ── Example: disabled ─────────────────────────────────────────────────────────

export const PicklistDisabledCase = () => (
	<Picklist options={FRUITS} defaultValue={['apple', 'cherry']} disabled availableLabel="Fruits" selectedLabel="Basket" />
);

// ── Example: controlled (with external state) ─────────────────────────────────

export const PicklistControlledCase = () => {
	const [selected, setSelected] = useState<number[]>([2, 3]);

	return (
		<div className="grid gap-4">
			<Picklist<number>
				options={PERMISSIONS}
				value={selected}
				onChange={setSelected}
				availableLabel="Available permissions"
				selectedLabel="Granted permissions"
			/>
			<p className="text-sm">
				<strong>Granted permission IDs:</strong> {selected.length ? selected.join(', ') : '–'}
			</p>
		</div>
	);
};

// ── All cases ─────────────────────────────────────────────────────────────────

export const PicklistCases = () => (
	<div className="grid gap-8">
		<section>
			<h2 className="text-base font-bold mb-2">Basic (uncontrolled)</h2>
			<PicklistBasicCase />
		</section>

		<section>
			<h2 className="text-base font-bold mb-2">With pre-selected items</h2>
			<PicklistPreselectedCase />
		</section>

		<section>
			<h2 className="text-base font-bold mb-2">Disabled</h2>
			<PicklistDisabledCase />
		</section>

		<section>
			<h2 className="text-base font-bold mb-2">Controlled (numeric values, with external state)</h2>
			<PicklistControlledCase />
		</section>
	</div>
);
