import { KolHeading, KolPopoverButton, KolToolbar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const PopoverButtonBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();
	const buttonRef = React.useRef<HTMLKolPopoverButtonElement>(null);

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
				<KolPopoverButton _show _label={'Actions'} _variant="primary" _icons={{ right: 'codicon codicon-chevron-down' }} ref={buttonRef}>
					<KolToolbar _label="Action toolbar" _items={TOOLBAR_ITEMS} _orientation="vertical" />
				</KolPopoverButton>
				<KolPopoverButton _label="Help" _icons="codicon codicon-info" _popoverAlign="right" _tooltipAlign="bottom" _hideLabel>
					<div className="w-sm p-2 border border-solid border-gray">
						<KolHeading _label="Help Information" _level={0}></KolHeading>
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
