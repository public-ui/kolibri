import React from 'react';
import { KolButton, KolCard, KolInputCheckbox } from '@public-ui/react';

import { FC } from 'react';

const STYLE = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '.5rem',
};

export const CardSelection: FC = () => (
	<div className="flex gap-2">
		<KolCard _hasFooter _heading="DEBTI-25437/17-1">
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content">
				<div>
					<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
				</div>
			</div>
			<div slot="footer">
				<div style={STYLE}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
		<KolCard _hasFooter _heading="DEBTI-25437/17-1">
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content">
				<div>
					<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
				</div>
			</div>
			<div slot="footer">
				<div style={STYLE}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
		<KolCard _hasFooter _heading="DEBTI-25437/17-1">
			<div slot="header">
				TeCorp Endplatte
				<br />
				VZTA
			</div>
			<div slot="content">
				<div>
					<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
				</div>
			</div>
			<div slot="footer">
				<div style={STYLE}>
					<KolInputCheckbox>Auswählen</KolInputCheckbox>
					<KolButton _variant="primary" _label="Öffnen"></KolButton>
				</div>
			</div>
		</KolCard>
	</div>
);
