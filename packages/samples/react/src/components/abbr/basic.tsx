import React from 'react';

import { KolAbbr } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Beim Bewegen der Maus über den unterstrichenen Abkürzungen, soll die ausgeschriebene Abkürzung an verschiedenen Stellen erscheinen.</p>
		</SampleDescription>
		<p>
			Ich bin <KolAbbr _label="zum Beispiel">z.B.</KolAbbr> eine Abkürzung.
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="zum Beispiel" _tooltipAlign="right">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (rechts).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="zum Beispiel" _tooltipAlign="bottom">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (unten).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="zum Beispiel" _tooltipAlign="left">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (links).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="zum Beispiel" _tooltipAlign="top">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (oben).
		</p>
	</>
);
