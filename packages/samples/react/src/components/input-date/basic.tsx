import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputDateVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputDateBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier sieht man ein Formularfeld mit verschiedenen Zeiteingaben. Bei Datumseingabe kann ein Datum in einem Kalender ausgewählt werden, aber auch
				eingetippt werden. Es gibt ein gleiches Verhalten im nächsten Feld. Die Felder Monat und Woche sind Freitextfelder. Im Feld Zeit können nur Werte von 0
				bis 23 und 0 bis 59 angegeben werden. Mit den Feldern Zahleneingabe gibt es keine Interaktionsmöglichekeit. Ein gleiches Verhalten gibt es im Rechten
				Feld, hier werden die Label erst nach anklicken angezeigt.{' '}
			</p>
		</SampleDescription>
		<FormWrap RefComponent={InputDateVariants} />
	</>
);
