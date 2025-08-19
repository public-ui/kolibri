import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolPopoverButton, KolToolbar, KolHeading } from '@public-ui/react-v19';
import { useToasterService } from '../../hooks/useToasterService';

export const PopoverButtonBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	const TOOLBAR_ITEMS = [
		{
			_label: 'Edit',
			_icons: 'codicon codicon-edit',
			_on: dummyEventHandler,
		},
		{
			_label: 'Delete',
			_icons: 'codicon codicon-trash',
			_on: dummyEventHandler,
		},
		{
			_label: 'Duplicate',
			_icons: 'codicon codicon-copy',
			_on: dummyEventHandler,
		},
	];

	return (
		<>
			<SampleDescription>
				<p>
					The PopoverButton component combines a button with a popover that appears when clicked. The popover can be positioned in different directions (top,
					right, bottom, left) using the <code>_popoverAlign</code> prop.
				</p>
			</SampleDescription>

			<div className="flex flex-col gap-4">
				<KolHeading _label="Vertical toolbar with action buttons" _level={2}></KolHeading>

				<KolPopoverButton _label={'Actions'} _variant="primary" _icons={{ right: 'codicon codicon-chevron-down' }}>
					<KolToolbar _label="Action toolbar" _items={TOOLBAR_ITEMS} _orientation="vertical" />
				</KolPopoverButton>

				<KolHeading _label="Info icon with help text" _level={2}></KolHeading>

				<KolPopoverButton _label="Help" _icons="codicon codicon-info" _popoverAlign="right" _tooltipAlign="bottom" _hideLabel>
					<div className="w-sm p-2 border border-solid border-gray">
						<KolHeading _label="Help Information" _level={3}></KolHeading>
						<p>
							<u>Lorem ipsum dolor sit amet</u>, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed voluptatum!
							Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
						</p>
					</div>
				</KolPopoverButton>
			</div>
		</>
	);
};
