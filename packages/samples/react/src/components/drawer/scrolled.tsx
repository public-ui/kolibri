import type { FC } from 'react';
import React, { useRef, useContext } from 'react';
import { KolDrawer, KolButton } from '@public-ui/react-v19';
import { HideMenusContext } from '../../shares/HideMenusContext';

export const DrawerScrolled: FC = () => {
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const hideMenus = useContext(HideMenusContext);

	return (
		!hideMenus && (
			<div className="h-[95vh] w-[95vw]" style={{ border: '1px solid black' }}>
				<KolDrawer ref={drawerElement} _label="Drawer" _align="bottom">
					{/* großer Inhalt, um Scrollbar-Bug sichtbar zu machen */}
					<div className="h-[2000px] bg-red/10" />
					<KolButton _label="Close" _on={{ onClick: () => drawerElement.current?.close() }} />
				</KolDrawer>

				<p>Some content outside the drawer</p>
				<KolButton _label="Open drawer" _on={{ onClick: () => drawerElement.current?.open() }} />
			</div>
		)
	);
};
