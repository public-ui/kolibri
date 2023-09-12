import React from 'react';
import { KolIndentedText, KolSkipNav } from '@public-ui/react';

import { FC } from 'react';

export const SkipNavBasic: FC = () => (
	<div className="grid gap-4">
		<KolIndentedText>
			<p>
				<b>Links sind unsichtbar geschalten</b>
				<br />
				Um die Links zu sehen, am besten einmal in diesen Bereich klicken und Tab-Taste drücken.
			</p>
		</KolIndentedText>
		<KolSkipNav
			_ariaLabel="Versteckte Navigation"
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
