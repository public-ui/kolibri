import type { KoliBriTableHeaders } from '@public-ui/components';
import { ToasterService } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolHeading, KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef } from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { getRoot } from '../shares/react-roots';

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
				void editButtonRef.current?.focus();
				handleEditClick();
				return;
			case 'KeyD':
				void deleteButtonRef.current?.focus();
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

export const ButtonShortkeyTable: FC = () => {
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
		{
			label: 'Row 3',
		},
		{
			label: 'Row 4',
		},
	];

	const HEADERS: KoliBriTableHeaders = {
		horizontal: [
			[
				{
					label: 'Label',
					key: 'label',
					textAlign: 'left',
					width: 200,
				},
				{
					label: 'Actions',
					key: 'actions',
					textAlign: 'left',
					width: 150,
					render: (el, cell) => {
						const data = cell.data as Data | undefined;
						getRoot(createReactRenderElement(el)).render(<RowActions label={data?.label ?? ''} />);
					},
				},
			],
		],
	};

	return (
		<>
			<SampleDescription>
				<p>
					This scenario demonstrates an interactive table where each row contains buttons with shortcut keys. The shortcut keys provide visual keyboard
					indicators and are also functionally implemented.
				</p>
				<p>
					<strong>How to use:</strong> Move focus within one of the &quot;Actions&quot; cells and press &quot;e&quot; to edit or &quot;d&quot; to delete the
					corresponding row.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Interactive Table with Button Shortkeys" />
					<KolTableStateful
						_label={`Interactive table with shortkey buttons in each row`}
						_data={DATA}
						_headers={HEADERS}
						_pagination={{
							_page: 1,
						}}
					/>
				</section>
			</div>
		</>
	);
};
