import type { FC } from 'react';
import React, { useState } from 'react';

import { KolDrawer, KolButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerControlled: FC = () => {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für ein Drawer. Es lässt sich öffnen und schließen mit Methoden. Dadurch erscheint ein Popup mit Text und &apos;Schließen&apos;
					Button. Durch anklicken des &apos;Schließen&apos; Button, schließt sich das Modal wieder.
				</p>
			</SampleDescription>
			<div>
				<KolDrawer _open={open} _align="left" _label="Ich bin ein kotrollierter Drawer" _on={{ onClose: () => setOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setOpen(false) }} />
					</div>
				</KolDrawer>
			</div>
		</div>
	);
};
