import type { FC } from 'react';
import React, { useState, useContext } from 'react';

import { HideMenusContext } from '../../shares/HideMenusContext';
import { KolDrawer, KolButton, KolBadge } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerControlled: FC = () => {
	const hideMenus = useContext(HideMenusContext);
	const [open, setOpen] = useState(true);
	return (
		<div>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für einen kontrollierten Drawer. Dieser lässt sich öffnen und schließen über das Attribut _open. Ein Drawer als Modal (_modal)
					ist nur unkontrolliert möglich. Der Drawer kann über das Attribut _align links, oben, rechts oder unten ausgerichtet werden.
				</p>
			</SampleDescription>
			<div>
				<KolDrawer _open={open} _align="left" _label="Ich bin ein kotrollierter Drawer" _on={{ onClose: () => setOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer as modal" _on={{ onClick: () => setOpen(true) }} />
			</div>
		</div>
	);
};
