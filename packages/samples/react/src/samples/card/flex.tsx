import React from 'react';
import { KolCard } from '@public-ui/react';

import { FC } from 'react';

export const CardFlex: FC = () => (
	<div className="grid grid-cols-2 gap-4">
		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">Inhalt</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">
				Inhalt
				<br />
				Inhalt
			</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">
				Inhalt
				<br />
				Inhalt
				<br />
				Inhalt
			</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">Inhalt</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
		<KolCard _heading="Titel" _hasFooter>
			<div slot="header">Zusätzlicher Header</div>
			<div slot="content">Inhalt</div>
			<div slot="footer">Fusszeile</div>
		</KolCard>
	</div>
);
