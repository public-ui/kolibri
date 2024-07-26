import React from 'react';
import { FC } from 'react';
import { KolAbbr } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const AbbrBasic: FC = () => (
	<>
		<SampleDescription></SampleDescription>
		<p>
			Ich bin <KolAbbr _title="Abkürzung">z.B.</KolAbbr> eine Abkürzung.
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _title="Abkürzung" _tooltipAlign="right">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (rechts).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _title="Abkürzung" _tooltipAlign="bottom">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (unten).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _title="Abkürzung" _tooltipAlign="left">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (links).
		</p>
		<p>
			Ich bin{' '}
			<KolAbbr _title="Abkürzung" _tooltipAlign="top">
				z.B.
			</KolAbbr>{' '}
			eine Abkürzung (oben).
		</p>
	</>
);
