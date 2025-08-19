import { createReactRenderElement, KolButton, KolHeading, KolTable } from '@public-ui/react-v19';
import type { FC } from 'react';
import { useRef } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import type { KoliBriTableHeaders } from '@public-ui/components';
import { ToasterService } from '@public-ui/components';

const RowActions: FC<{ label: string }> = ({ label }) => {
	const toaster = ToasterService.getInstance(document);
	const editButtonRef = useRef<HTMLKolButtonElement | null>(null);
	const deleteButtonRef = useRef<HTMLKolButtonElement | null>(null);

	const handleEditClick = () => {
		toaster.enqueue({
			label: 'Edit clicked',
			description: `The button "edit" has been clicked for ${label}`,
			type: 'info',
		});
	};

	const handleDeleteClick = () => {
		toaster.enqueue({
			label: 'Delete clicked',
			description: `The button "delete" has been clicked for ${label}`,
			type: 'warning',
		});
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
		switch (event.code) {
			case 'KeyE':
				void editButtonRef.current?.kolFocus();
				handleEditClick();
				return;
			case 'KeyD':
				void deleteButtonRef.current?.kolFocus();
				handleDeleteClick();
				return;
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			style={{
				display: 'flex',
				gap: 'calc(10rem / var(--kolibri-root-font-size, 16))',
			}}
			onKeyUp={handleKeyUp}
		>
			<KolButton ref={editButtonRef} _label={'Edit'} _shortKey={'e'} _on={{ onClick: handleEditClick }} />
			<KolButton ref={deleteButtonRef} _label={'Delete'} _shortKey={'d'} _variant={'danger'} _on={{ onClick: handleDeleteClick }} />
		</div>
	);
};

export const ButtonShortKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	type Data = {
		label: string;
	};
	const DATA: Data[] = [
		{
			label: 'Row 1',
		},
		{
			label: 'Row 2',
		},
	];

	const HEADERS: KoliBriTableHeaders = {
		horizontal: [
			[
				{
					label: 'Label',
					key: 'label',
					textAlign: 'left',
				},
				{
					label: 'Actions',
					key: 'actions',
					textAlign: 'left',

					render: (el, cell) => {
						getRoot(createReactRenderElement(el)).render(<RowActions label={(cell.data as Data).label} />);
					},
				},
			],
		],
	};

	return (
		<>
			<SampleDescription>
				<p>
					The first sample shows KolButton with short key without functionality. The short key is purely visual. Its functionality needs to be developed
					separately.
				</p>
				<p>
					The second sample showcases a table where each row contains two KolButtons, each with its own shortcut key. To trigger an action, move the focus to
					any of the &quot;Actions&quot; cells and press &quot;e&quot; or &quot;d.&quot; Doing so will activate the corresponding action and display a Toast
					notification for demonstration purposes.
				</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4">
				<KolButton _label="With S short key" _shortKey="S" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Very small b" _shortKey="b" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Short key does not appear in label" _shortKey="x" _on={dummyEventHandler}></KolButton>
				<KolButton _label="short key without label" _hideLabel _shortKey="k" _icons="codicon codicon-dashboard" _on={dummyEventHandler}></KolButton>
				<KolButton
					_label="with inline icons"
					_icons={{
						left: 'codicon codicon-dashboard',
						right: 'codicon codicon-dashboard',
					}}
					_shortKey="n"
					_on={dummyEventHandler}
				/>
			</div>

			<KolHeading _level={2} _label="Interactive sample" className="mt" />

			<KolTable _label={`Move focus within one of the "Actions" cells and press "e" or "d" to trigger an action.`} _data={DATA} _headers={HEADERS} />
		</>
	);
};
