import React from 'react';

import { KolDetails } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const DetailsBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier sind zwei Texte. Beide können durch das klicken auf den &apos;Titel&apos; geöffnet und wieder geschlossen werden. Der untere Text ist nach laden
				der Seite bereits geöffnet, während der obere Text nach laden der Seite geschlossen ist.{' '}
			</p>
		</SampleDescription>
		<p className="grid gap-4">
			<KolDetails _label="Nach Laden der Seite geschlossen">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
			</KolDetails>
			<KolDetails _label="Nach Laden der Seite geöffnet" _open>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
			</KolDetails>
		</p>
	</>
);
