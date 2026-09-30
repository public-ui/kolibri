import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
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
				width: 60,
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as unknown as DataRow).id - (data1 as unknown as DataRow).id,
				sortDirection: 'ASC',
			},
			{
				key: 'name',
				label: 'Name',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as unknown as DataRow).name.localeCompare((data1 as unknown as DataRow).name, 'de'),
				sortDirection: 'ASC',
			},
			{
				key: 'email',
				label: 'E-Mail',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as unknown as DataRow).email.localeCompare((data1 as unknown as DataRow).email, 'de'),
				sortDirection: 'ASC',
			},
		],
	],
};

function deleteSelected() {
	console.log('Test');
}
type SetNameValueFn = (value: string) => void;
type SetEmailValueFn = (value: string) => void;

const AddEntryEditor: React.FC<{ nameValue: string; setNameValue: SetNameValueFn; emailValue: string; setEmailValue: SetEmailValueFn }> = ({
	nameValue,
	setNameValue,
	emailValue,
	setEmailValue,
}) => {
	return (
		<>
			<KolInputText
				_label="Vorname, Name"
				_value={nameValue}
				_on={{
					onInput: (e: Event) => {
						setNameValue((e.target as HTMLInputElement).value);
					},
				}}
			/>
			<KolInputText
				_label="Email"
				_value={emailValue}
				_on={{
					onInput: (e: Event) => {
						setEmailValue((e.target as HTMLInputElement).value);
					},
				}}
			/>
		</>
	);
};

export const TableWithToolbar: FC = () => {
	const [isAdding, setIsAdding] = useState(false);
	const [dataRows, setDataRows] = useState<DataRow[]>(DATA);
	const [nameValue, setNameValue] = useState('Vorname, Name');
	const [emailValue, setEmailValue] = useState('Vorname.Nachname@example.com');
	const [nextID, setNextID] = useState(dataRows.length + 1001);

	function addEntry() {
		const newRow: DataRow = { id: nextID, name: nameValue, email: emailValue };
		setNextID(1 + nextID);
		setDataRows([...dataRows, newRow]);
		setIsAdding(false);
	}

	return (
		<>
			<SampleDescription>
				<p>TEXT</p>
			</SampleDescription>

			<section className="w-full">
				<KolToolbar
					_items={[
						{
							type: 'button',
							_label: 'Auswahl löschen',
							_on: {
								onClick: () => {
									deleteSelected();
								},
							},
						},
						{
							type: 'button',
							_label: 'Neuer Eintrag',
							_on: {
								onClick: () => {
									setIsAdding(!isAdding);
								},
							},
						},
					]}
					_label="Toolbar"
				/>

				<KolDrawer _label="Eintag hinzufügen" _open={isAdding} _align="right" _hasCloser _on={{ onClose: () => setIsAdding(false) }}>
					<div className="flex flex-col gap-4 py-4">
						<AddEntryEditor nameValue={nameValue} setNameValue={setNameValue} emailValue={emailValue} setEmailValue={setEmailValue} />
						<KolButton _label="Hinzufügen" _variant="primary" _on={{ onClick: () => addEntry() }} />
					</div>
				</KolDrawer>

				<KolTableStateful
					_label="Benutzerverwaltung mit Action-Spalte"
					_headers={HEADERS}
					_data={dataRows}
					className="block"
					_selection={{
						multiple: true,
						label: (row) => `Select ${(row as DataRow).name}`,
						keyPropertyName: 'id',
						selectedKeys: [],
					}}
				/>
			</section>
		</>
	);
};
