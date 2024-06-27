import type { FC } from 'react';
import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { HideMenusContext } from '../../shares/HideMenusContext';
import type { AlignPropType } from '@public-ui/components';
import { KolDrawer, KolButton, KolBadge } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import { DrawerRadioAlign } from './partials/align';

export const DrawerControlled: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const hideMenus = useContext(HideMenusContext);
	const [open, setOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [align, setAlign] = useState<AlignPropType>(defaultAlign);
	return (
		<div>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für einen kontrollierten Drawer. Dieser lässt sich öffnen und schließen über das Attribut _open. Zusätzlich lässt sich der
					Dialog als Modal (_modal) durch ESC schließen. Der Drawer kann über das Attribut _align links, oben, rechts oder unten ausgerichtet werden.
				</p>
			</SampleDescription>
			<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
			<div className="flex flex-wrap gap-4">
				<KolDrawer _open={open} _align={align} _label="Ich bin ein kotrollierter Drawer" _on={{ onClose: () => setOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => setOpen(true) }} />
				<KolDrawer _open={modalOpen} _modal _align={align} _label="Ich bin ein kotrollierter Modal Drawer" _on={{ onClose: () => setModalOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setModalOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer as modal" _on={{ onClick: () => setModalOpen(true) }} />
			</div>
		</div>
	);
};
