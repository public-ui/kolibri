import React, { useState } from 'react';

import { KolButton, KolSelect } from '@public-ui/react-v19';

import type { SelectOption } from '@public-ui/components';

import './picklist.css';

export type PicklistOption<T = string> = SelectOption<T>;

export type PicklistProps<T = string> = {
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
	size?: number;
};

const byLabel = <T,>(a: PicklistOption<T>, b: PicklistOption<T>) =>
	String(a.label).localeCompare(String(b.label));

function partition<T>(options: PicklistOption<T>[], selectedValues: T[]): [PicklistOption<T>[], PicklistOption<T>[]] {
	const selectedSet = new Set(selectedValues.map(String));
	const available: PicklistOption<T>[] = [];
	const selected: PicklistOption<T>[] = [];
	for (const opt of options) {
		(selectedSet.has(String(opt.value)) ? selected : available).push(opt);
	}
	return [available, selected];
}

export function Picklist<T = string>({
	options,
	defaultValue,
	value: controlledValue,
	onChange,
	availableLabel = 'Available',
	selectedLabel = 'Selected',
	disabled = false,
	size = 8,
}: PicklistProps<T>) {
	const isControlled = controlledValue !== undefined;

	const [internalValue, setInternalValue] = useState<T[]>(defaultValue ?? []);
	const selectedValues = isControlled ? controlledValue! : internalValue;

	const [available, selectedOptions] = partition(options, selectedValues);

	// Items the user has highlighted (focused) within each list
	const [availableFocus, setAvailableFocus] = useState<T[]>([]);
	const [selectedFocus, setSelectedFocus] = useState<T[]>([]);

	function commit(next: T[]) {
		if (!isControlled) setInternalValue(next);
		onChange?.(next);
	}

	const addSelected = () => {
		const focusSet = new Set(availableFocus.map(String));
		const toAdd = available.filter((o) => focusSet.has(String(o.value))).map((o) => o.value as T);
		commit([...selectedValues, ...toAdd]);
		setAvailableFocus([]);
	};

	const addAll = () => {
		commit([...selectedValues, ...available.map((o) => o.value as T)]);
		setAvailableFocus([]);
		setSelectedFocus([]);
	};

	const removeSelected = () => {
		const focusSet = new Set(selectedFocus.map(String));
		commit(selectedValues.filter((v) => !focusSet.has(String(v))));
		setSelectedFocus([]);
	};

	const removeAll = () => {
		commit([]);
		setAvailableFocus([]);
		setSelectedFocus([]);
	};

	// Preserve the order in which items were added to the selected list
	const orderedSelected = options.filter((o) => selectedValues.includes(o.value as T));

	return (
		<div className="kol-picklist__layout">
			<div className="kol-picklist__list">
				<KolSelect
					_label={availableLabel}
					_options={available.sort(byLabel)}
					_value={availableFocus as unknown as string[]}
					_multiple
					_disabled={disabled}
					_size={size}
					_on={{ onChange: (_e, val) => setAvailableFocus(val as T[]) }}
					style={{ width: '100%' }}
				/>
			</div>

			<div className="kol-picklist__actions" aria-label="Transfer actions">
				<KolButton
					_label="Add selected"
					_icons="kolicon-chevron-right"
					_hideLabel
					_variant="primary"
					_disabled={disabled || availableFocus.length === 0}
					_on={{ onClick: addSelected }}
					_tooltipAlign="top"
				/>
				<KolButton
					_label="Add all"
					_icons="kolicon-chevrons-right"
					_hideLabel
					_variant="secondary"
					_disabled={disabled || available.length === 0}
					_on={{ onClick: addAll }}
					_tooltipAlign="top"
				/>
				<KolButton
					_label="Remove selected"
					_icons="kolicon-chevrons-left"
					_hideLabel
					_variant="secondary"
					_disabled={disabled || selectedFocus.length === 0}
					_on={{ onClick: removeSelected }}
					_tooltipAlign="top"
				/>
				<KolButton
					_label="Remove all"
					_icons="kolicon-chevron-left"
					_hideLabel
					_variant="tertiary"
					_disabled={disabled || orderedSelected.length === 0}
					_on={{ onClick: removeAll }}
					_tooltipAlign="top"
				/>
			</div>

			<div className="kol-picklist__list">
				<KolSelect
					_label={selectedLabel}
					_options={orderedSelected}
					_value={selectedFocus as unknown as string[]}
					_multiple
					_disabled={disabled}
					_size={size}
					_on={{ onChange: (_e, val) => setSelectedFocus(val as T[]) }}
					style={{ width: '100%' }}
				/>
			</div>
		</div>
	);
}
