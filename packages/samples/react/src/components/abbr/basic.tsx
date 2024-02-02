import React from 'react';

import { KolAbbr } from '@public-ui/react';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<p>
			Ich bin <KolAbbr _label="Abkürzung">z.B.</KolAbbr> eine Abkürzung.
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="Abkürzung" _tooltipAlign="right">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (rechts).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="Abkürzung" _tooltipAlign="bottom">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (unten).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="Abkürzung" _tooltipAlign="left">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (links).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _label="Abkürzung" _tooltipAlign="top">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (oben).
		</p>
	</>
);
