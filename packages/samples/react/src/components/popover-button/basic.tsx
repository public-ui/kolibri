import type { FC } from 'react';
import { useContext } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolButton, KolPopoverButton, KolBadge } from '@public-ui/react-v19';
import { useToasterService } from '../../hooks/useToasterService';
import { HideMenusContext } from '../../shares/HideMenusContext';

export const PopoverButtonBasic: FC = () => {
	const hideMenus = useContext(HideMenusContext);
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					The PopoverButton component combines a button with a popover that appears when clicked. The popover can be positioned in different directions (top,
					right, bottom, left) using the <code>_popoverAlign</code> prop.
				</p>
			</SampleDescription>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}

			<div className="flex flex-wrap gap-4">
				<KolPopoverButton _label={'Open popover'} _variant="primary" _icons={{ right: 'codicon codicon-chevron-down' }}>
					<KolButton _label="Button within popover" _variant="primary" _on={dummyEventHandler} />
					<br />
					<br />
					<KolButton _label="Second Button within popover" _on={dummyEventHandler} />
				</KolPopoverButton>

				<KolPopoverButton _label="Open popover" _popoverAlign="right" _icons={{ right: 'codicon codicon-chevron-right' }}>
					<p className="w-sm">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed voluptatum!
						Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
					</p>
				</KolPopoverButton>

				<KolPopoverButton _label="icon-only with tooltip" _icons="codicon codicon-info" _tooltipAlign="right" _hideLabel>
					This is an explanation shown on click.
				</KolPopoverButton>

				<KolPopoverButton _label="">
					<span slot="expert">
						<u>Expert slot content</u>
					</span>
					This sample illustrates a button with expert slot.
				</KolPopoverButton>
			</div>
		</>
	);
};
