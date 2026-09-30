import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableSelection, ToolbarItemsPropType } from '@public-ui/components';
import { KolButton, KolDrawer, KolInputCheckbox, KolInputText, KolTableStateful, KolToolbar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

type DataRow = {
	id: number;
	name: string;
	email: string;
};

const DATA: DataRow[] = [
	{ id: 1001, name: 'Max Mustermann', email: 'max.mustermann@example.com' },
	{ id: 1002, name: 'Erika Musterfrau', email: 'erika.musterfrau@example.com' },
	{ id: 1003, name: 'John Doe', email: 'john.doe@example.com' },
	{ id: 1004, name: 'Jane Doe', email: 'jane.doe@example.com' },
	{ id: 1005, name: 'Peter Smith', email: 'peter.smith@example.com' },
	{ id: 1006, name: 'Anna Smith', email: 'anna.smith@example.com' },
	{ id: 1007, name: 'Michael Schmidt', email: 'michael.schmidt@example.com' },
	{ id: 1008, name: 'Sarah Schmidt', email: 'sarah.schmidt@example.com' },
	{ id: 1009, name: 'Thomas Müller', email: 'thomas.mueller@example.com' },
	{ id: 1010, name: 'Lisa Müller', email: 'lisa.mueller@example.com' },
];

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{
				key: 'id',
				label: 'ID',
				textAlign: 'left',
				width: 80,
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as DataRow).id - (data1 as DataRow).id,
				sortDirection: 'ASC',
			},
			{
				key: 'name',
				label: 'Name',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as DataRow).name.localeCompare((data1 as DataRow).name, 'de'),
				sortDirection: 'ASC',
			},
			{
				key: 'email',
				label: 'E-Mail',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as DataRow).email.localeCompare((data1 as DataRow).email, 'de'),
				sortDirection: 'ASC',
			},
		],
	],
};

export const FIRST_NAMES = ['Ada', 'Bruno', 'Clara', 'Finn', 'Ida', 'Jonas', 'Lena', 'Nele', 'Otto', 'Sina'];
export const LAST_NAMES = ['Bauer', 'Fuchs', 'Hirsch', 'Kraft', 'Lindner', 'Moor', 'Reuter', 'Schubert', 'Wagner', 'Winter'];

function pick<T>(values: T[]): T {
	return values[Math.floor(Math.random() * values.length)];
}

function nextId(rows: DataRow[]): number {
	return rows.reduce((max, row) => Math.max(max, row.id), 1000) + 1;
}

function createDummyRow(id: number): DataRow {
	const firstName = pick(FIRST_NAMES);
	const lastName = pick(LAST_NAMES);
	return {
		id,
		name: `${firstName} ${lastName}`,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
	};
}

export const TableWithToolbar: FC = () => {
	const [dataRows, setDataRows] = useState<DataRow[]>(DATA);
	/** Schlüssel (`DataRow.id`) aller ausgewählten Zeilen. */
	const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
	const [isMultiple, setIsMultiple] = useState(false);
	/** Solange ein Datensatz vorliegt, ist das Formular geöffnet; existiert seine ID bereits, wird bearbeitet. */
	const [draft, setDraft] = useState<DataRow | null>(null);

	const isEditing = draft !== null && dataRows.some((row) => row.id === draft.id);

	const selection: KoliBriTableSelection = {
		keyPropertyName: 'id',
		label: (row) => `Zeile ${(row as DataRow).name} auswählen`,
		multiple: isMultiple,
		selectedKeys,
	};

	const handleSelectionChange = (_event: Event, selectedRows: KoliBriTableDataType[] | null) => {
		setSelectedKeys((selectedRows ?? []).map((row) => (row as DataRow).id));
	};

	const handleSelectionModeSwitch = (_event: Event, value: unknown) => {
		setIsMultiple(value === true);
		/* Eine Mehrfachauswahl passt nicht in den Einzelauswahl-Modus. */
		if (value !== true && selectedKeys.length > 1) {
			setSelectedKeys([]);
		}
	};

	const openAddDrawer = () => {
		setDraft(createDummyRow(nextId(dataRows)));
	};

	const editSelectedRow = () => {
		const selectedRow = dataRows.find((row) => row.id === selectedKeys[0]);
		if (selectedRow !== undefined) {
			setDraft({ ...selectedRow });
		}
	};

	const closeDrawer = () => {
		setDraft(null);
	};

	const saveDraft = () => {
		if (draft !== null) {
			setDataRows((rows) => (isEditing ? rows.map((row) => (row.id === draft.id ? draft : row)) : [...rows, draft]));
		}
		setDraft(null);
	};

	const deleteSelectedRows = () => {
		if (selectedKeys.length === 0) {
			return;
		}
		setDataRows(dataRows.filter((row) => !selectedKeys.includes(row.id)));
		setSelectedKeys([]);
	};

	const toolbarItems: ToolbarItemsPropType = [
		{
			type: 'button',
			_label: 'Hinzufügen',
			_icons: { left: { icon: 'kolicon-plus' } },
			_variant: 'primary',
			_on: { onClick: openAddDrawer },
		},
		{
			type: 'button',
			_label: 'Bearbeiten',
			_variant: 'secondary',
			_disabled: selectedKeys.length !== 1,
			_on: { onClick: editSelectedRow },
		},
		{
			type: 'button',
			_label: 'Löschen',
			_icons: { left: { icon: 'kolicon-cross' } },
			_variant: 'danger',
			_disabled: selectedKeys.length === 0,
			_on: { onClick: deleteSelectedRows },
		},
	];

	return (
		<>
			<SampleDescription>
				<p>
					Dieses Beispiel kombiniert eine Toolbar mit einer Tabelle: Ein Schalter wechselt zwischen Einzel- und Mehrfachauswahl. „Hinzufügen“ erzeugt einen
					neuen Dummy-Datensatz in einem Formular und fügt ihn über „Anlegen“ ein. „Bearbeiten“ öffnet die ausgewählte Zeile im selben Formular, wenn genau eine
					Zeile gewählt ist. „Löschen“ entfernt alle ausgewählten Zeilen und ist erst mit Auswahl aktiv.
				</p>
			</SampleDescription>

			<section className="w-full">
				<KolToolbar _label="Aktionen für die Tabelle" _items={toolbarItems} />

				<KolInputCheckbox
					className="block w-fit py-2"
					_label="Mehrfachauswahl"
					_variant="switch"
					_checked={isMultiple}
					_value={true}
					_on={{ onInput: handleSelectionModeSwitch }}
				/>

				<KolDrawer
					_label={isEditing ? 'Eintrag bearbeiten' : 'Eintrag hinzufügen'}
					_align="right"
					_level={2}
					_open={draft !== null}
					_hasCloser
					_on={{ onClose: closeDrawer }}
				>
					{draft !== null && (
						<div className="flex flex-col gap-4 py-4">
							<KolInputText _label="Name" _value={draft.name} _on={{ onInput: (_event, value) => setDraft({ ...draft, name: String(value) }) }} />
							<KolInputText _label="E-Mail" _value={draft.email} _on={{ onInput: (_event, value) => setDraft({ ...draft, email: String(value) }) }} />
							<div className="flex flex-wrap gap-2">
								<KolButton _label={isEditing ? 'Speichern' : 'Anlegen'} _variant="primary" _on={{ onClick: saveDraft }} />
								<KolButton _label="Abbrechen" _variant="secondary" _on={{ onClick: closeDrawer }} />
							</div>
						</div>
					)}
				</KolDrawer>

				<KolTableStateful
					_label="Benutzerverwaltung"
					_headers={HEADERS}
					_data={dataRows}
					className="block"
					_selection={selection}
					_on={{ onSelectionChange: handleSelectionChange }}
				/>
			</section>
		</>
	);
};
