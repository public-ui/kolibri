import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableSelection, ToolbarItemsPropType } from '@public-ui/components';
import { KolButton, KolDrawer, KolInputText, KolTableStateful, KolToolbar } from '@public-ui/react-v19';
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
	/** Schlüssel (`DataRow.id`) der ausgewählten Zeile, ohne Auswahl `null`. */
	const [selectedKey, setSelectedKey] = useState<number | null>(null);
	/** Solange ein Datensatz vorliegt, ist das Anlege-Formular geöffnet. */
	const [draft, setDraft] = useState<DataRow | null>(null);

	const selection: KoliBriTableSelection = {
		keyPropertyName: 'id',
		label: (row) => `Zeile ${(row as DataRow).name} auswählen`,
		multiple: false,
		selectedKeys: selectedKey === null ? [] : [selectedKey],
	};

	const handleSelectionChange = (_event: Event, selectedRows: KoliBriTableDataType[] | null) => {
		const selectedRow = selectedRows?.[0] as DataRow | undefined;
		setSelectedKey(selectedRow === undefined ? null : selectedRow.id);
	};

	const openAddDrawer = () => {
		setDraft(createDummyRow(nextId(dataRows)));
	};

	const closeAddDrawer = () => {
		setDraft(null);
	};

	const addDraft = () => {
		if (draft !== null) {
			setDataRows([...dataRows, draft]);
		}
		setDraft(null);
	};

	const deleteSelectedRow = () => {
		if (selectedKey === null) {
			return;
		}
		setDataRows(dataRows.filter((row) => row.id !== selectedKey));
		setSelectedKey(null);
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
			_label: 'Löschen',
			_icons: { left: { icon: 'kolicon-cross' } },
			_variant: 'danger',
			_disabled: selectedKey === null,
			_on: { onClick: deleteSelectedRow },
		},
	];

	return (
		<>
			<SampleDescription>
				<p>
					Dieses Beispiel kombiniert eine Toolbar mit einer Tabelle: Über „Hinzufügen“ wird ein neuer Dummy-Datensatz in einem Formular erzeugt und über
					„Anlegen“ in die Tabelle eingefügt. „Löschen“ entfernt die ausgewählte Zeile und ist erst aktiv, wenn eine Zeile ausgewählt ist.
				</p>
			</SampleDescription>

			<section className="w-full">
				<KolToolbar _label="Aktionen für die Tabelle" _items={toolbarItems} />

				<KolDrawer _label="Eintrag hinzufügen" _align="right" _level={2} _open={draft !== null} _hasCloser _on={{ onClose: closeAddDrawer }}>
					{draft !== null && (
						<div className="flex flex-col gap-4 py-4">
							<KolInputText _label="Name" _value={draft.name} _on={{ onInput: (_event, value) => setDraft({ ...draft, name: String(value) }) }} />
							<KolInputText _label="E-Mail" _value={draft.email} _on={{ onInput: (_event, value) => setDraft({ ...draft, email: String(value) }) }} />
							<div className="flex flex-wrap gap-2">
								<KolButton _label="Anlegen" _variant="primary" _on={{ onClick: addDraft }} />
								<KolButton _label="Abbrechen" _variant="secondary" _on={{ onClick: closeAddDrawer }} />
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
