import type { FC } from 'react';
import React from 'react';

import { KolSkipNav } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

export const SkipNavBasic: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>
				<b>Links sind unsichtbar geschaltet</b>
				<br />
				Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
			</p>
		</SampleDescription>
		<KolSkipNav
			_label="Versteckte Navigation"
			_links={[
				{
					_label: 'Zum Anfang',
					_selector: 'header',
				},
				{
					_label: 'Zum Formular',
					_selector: '#form',
				},
				{
					_label: 'Zum Ende',
					_selector: 'footer',
				},
			]}
		></KolSkipNav>
	</div>
);
