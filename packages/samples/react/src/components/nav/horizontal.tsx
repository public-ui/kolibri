import React from 'react';
import { KolNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { LINKS } from './links';

import type { FC } from 'react';
export const NavHorizontal: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier ist ein Beispiel für eine horizontale Navigation. Durch anklicken des rechten + Symbols kann die Navigation erweitert und Untermenüs geöffnet
				werden.
			</p>
		</SampleDescription>
		<KolNav _label="Main navigation" _links={LINKS} _orientation="horizontal" />
	</>
);
