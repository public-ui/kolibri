import type { FC } from 'react';
import React from 'react';

import { KolDrawer } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für ein Drawer. Es lässt sich öffnen und schließen mit Methoden. Dadurch erscheint ein Popup mit Text und &apos;Schließen&apos;
					Button. Durch anklicken des &apos;Schließen&apos; Button, schließt sich das Modal wieder.
				</p>
			</SampleDescription>
			<div>
				<KolDrawer _label="Ich bin ein Drawer" _on={{ onClose: () => console.log('Modal closed') }}>
					<div>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
							diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
							sit amet.
						</p>
					</div>
				</KolDrawer>
			</div>
		</>
	);
};
