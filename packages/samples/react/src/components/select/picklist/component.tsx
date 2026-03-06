import React, { useRef, useState } from 'react';

import { KolButton, KolDialog, KolSelect, KolToolbar } from '@public-ui/react-v19';

import type { Option, StencilUnknown, ToolbarItemsPropType } from '@public-ui/components';

import './style.css';

export type PicklistOption<T extends StencilUnknown = string> = Option<T>;

export type PicklistProps<T extends StencilUnknown = string> = {
	/** All options that can be selected. */
	options: PicklistOption<T>[];
	/** Initially selected values (uncontrolled mode). Matching options start in the "Selected" list. */
	defaultValue?: T[];
	/** Controlled selected values. Provide onChange to keep them in sync. */
	value?: T[];
	/** Called with the updated selected values whenever the selection changes. */
	onChange?: (selected: T[]) => void;
	/** Label for the available-items list. */
	availableLabel?: string;
	/** Label for the selected-items list. */
	selectedLabel?: string;
	/** Disables all interaction. */
	disabled?: boolean;
	/** Number of visible rows in each list box. */
	rows?: number;
};

const byLabel = <T extends StencilUnknown>(a: PicklistOption<T>, b: PicklistOption<T>) => String(a.label).localeCompare(String(b.label));

function partition<T extends StencilUnknown>(options: PicklistOption<T>[], selectedValues: T[]): [PicklistOption<T>[], PicklistOption<T>[]] {
	const selectedSet = new Set(selectedValues.map(String));
	const available: PicklistOption<T>[] = [];
	const selected: PicklistOption<T>[] = [];
	for (const opt of options) {
		(selectedSet.has(String(opt.value)) ? selected : available).push(opt);
	}
	return [available, selected];
}

export function Picklist<T extends StencilUnknown = string>({
	options,
	defaultValue,
	value: controlledValue,
	onChange,
	availableLabel = 'Available',
	selectedLabel = 'Selected',
	disabled = false,
	rows = 8,
}: PicklistProps<T>) {
	const isControlled = controlledValue !== undefined;

	const [internalValue, setInternalValue] = useState<T[]>(defaultValue ?? []);
	const selectedValues = isControlled ? controlledValue! : internalValue;

	const [available] = partition(options, selectedValues);

	// Items the user has highlighted (focused) within each list
	const [availableFocus, setAvailableFocus] = useState<T[]>([]);
	const [selectedFocus, setSelectedFocus] = useState<T[]>([]);

	// Dialog hint state
	const [dialogHint, setDialogHint] = useState<{ title: string; message: string } | null>(null);
	const dialogRef = useRef<HTMLKolDialogElement>(null);

	function commit(next: T[]) {
		if (!isControlled) setInternalValue(next);
		onChange?.(next);
	}

	const addSelected = () => {
		if (availableFocus.length === 0) {
			setDialogHint({
				title: 'No items selected',
				message: 'Please select items from the available list first.',
			});
			requestAnimationFrame(() => dialogRef.current?.openModal());
			return;
		}
		const focusSet = new Set(availableFocus.map(String));
		const toAdd = available.filter((o) => focusSet.has(String(o.value))).map((o) => o.value as T);
		commit([...selectedValues, ...toAdd]);
		setAvailableFocus([]);
	};

	const addAll = () => {
		if (available.length === 0) {
			setDialogHint({
				title: 'No items available',
				message: 'All items have already been selected.',
			});
			requestAnimationFrame(() => dialogRef.current?.openModal());
			return;
		}
		commit([...selectedValues, ...available.map((o) => o.value as T)]);
		setAvailableFocus([]);
		setSelectedFocus([]);
	};

	const removeSelected = () => {
		if (selectedFocus.length === 0) {
			setDialogHint({
				title: 'No items selected',
				message: 'Please select items from the selected list first.',
			});
			requestAnimationFrame(() => dialogRef.current?.openModal());
			return;
		}
		const focusSet = new Set(selectedFocus.map(String));
		commit(selectedValues.filter((v) => !focusSet.has(String(v))));
		setSelectedFocus([]);
	};

	const removeAll = () => {
		if (orderedSelected.length === 0) {
			setDialogHint({
				title: 'No items selected',
				message: 'There are no items to remove.',
			});
			requestAnimationFrame(() => dialogRef.current?.openModal());
			return;
		}
		commit([]);
		setAvailableFocus([]);
		setSelectedFocus([]);
	};

	// Preserve the order in which items were added to the selected list
	const orderedSelected = options.filter((o) => selectedValues.includes(o.value as T));

	// Create toolbar items for transfer actions
	const toolbarItems: ToolbarItemsPropType = [
		{
			type: 'button',
			_label: 'Add selected',
			_icons: 'kolicon-chevron-right',
			_hideLabel: true,
			_variant: 'primary',
			_on: { onClick: addSelected },
			_tooltipAlign: 'top',
		},
		{
			type: 'button',
			_label: 'Add all',
			_icons: { left: { icon: 'kolicon-chevron-double-right' } },
			_hideLabel: true,
			_variant: 'secondary',
			_on: { onClick: addAll },
			_tooltipAlign: 'top',
		},
		{
			type: 'button',
			_label: 'Remove selected',
			_icons: 'kolicon-chevron-left',
			_hideLabel: true,
			_variant: 'secondary',
			_on: { onClick: removeSelected },
			_tooltipAlign: 'top',
		},
		{
			type: 'button',
			_label: 'Remove all',
			_icons: { left: { icon: 'kolicon-chevron-double-left' } },
			_hideLabel: true,
			_variant: 'tertiary',
			_on: { onClick: removeAll },
			_tooltipAlign: 'top',
		},
	];

	return (
		<div className="kol-picklist__layout">
			<div className="kol-picklist__list">
				<KolSelect
					_label={availableLabel}
					_options={available.sort(byLabel)}
					_value={availableFocus as unknown as string[]}
					_multiple
					_disabled={disabled}
					_rows={rows}
					_on={{ onChange: (_e, val) => setAvailableFocus(val as T[]) }}
					style={{ width: '100%' }}
				/>
			</div>

			<KolToolbar _label="Transfer actions" _items={toolbarItems} _orientation="vertical" aria-label="Transfer actions" />

			{dialogHint && (
				<KolDialog
					_label={dialogHint.title}
					_variant="card"
					ref={dialogRef}
					_on={{
						onClose: () => setDialogHint(null),
					}}
				>
					<p>{dialogHint.message}</p>
					<KolButton _label="Close" _on={{ onClick: () => setDialogHint(null) }} />
				</KolDialog>
			)}

			<div className="kol-picklist__list">
				<KolSelect
					_label={selectedLabel}
					_options={orderedSelected}
					_value={selectedFocus as unknown as string[]}
					_multiple
					_disabled={disabled}
					_rows={rows}
					_on={{ onChange: (_e, val) => setSelectedFocus(val as T[]) }}
					style={{ width: '100%' }}
				/>
			</div>
		</div>
	);
}
