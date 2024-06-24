import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolDrawer, KolButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerBasic: FC = () => {
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const drawerModalElement = useRef<HTMLKolDrawerElement>(null);
	return (
		<>
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für ein Drawer. Es lässt sich öffnen und schließen mit Methoden. Dadurch erscheint ein Popup mit Text und &apos;Schließen&apos;
					Button. Durch anklicken des &apos;Schließen&apos; Button, schließt sich das Modal wieder.
				</p>
			</SampleDescription>
			<div>
				<KolDrawer ref={drawerElement} _label="Ich bin ein Drawer" _align="top" _on={{ onClose: () => console.log('Drawer onClose triggered!') }}>
					<div>
						<p>
							Lorem ipsum dolor sit amet
						</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close()}}/>
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => drawerElement.current?.open()}}/>
			</div>
			<div>
				<KolDrawer ref={drawerModalElement} _modal _label="Ich bin ein Drawer Modal" _on={{ onClose: () => console.log('Drawer Modal onClose triggered!') }}>
					<div>
						<p>
							Lorem ipsum dolor sit amet
						</p>
						<KolButton _label="Close drawer modal" _on={{ onClick: () => drawerModalElement.current?.close()}}/>
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer as modal" _on={{ onClick: () => drawerModalElement.current?.open()}}/>
			</div>
		</>
	);
};
