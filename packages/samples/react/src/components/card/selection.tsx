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
		<KolCard _label="DEBTI-25437/17-1">
			<div>
				<div>
					TeCorp Endplatte
					<br />
					VZTA
				</div>
				<div>
					<div>
						<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
					</div>
				</div>
				<div>
					<div style={STYLE}>
						<KolInputCheckbox _label={`Auswählen`} />
						<KolButton _variant="primary" _label="Öffnen"></KolButton>
					</div>
				</div>
			</div>
		</KolCard>
		<KolCard _label="DEBTI-25437/17-1">
			<div>
				<div>
					TeCorp Endplatte
					<br />
					VZTA
				</div>
				<div>
					<div>
						<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
					</div>
				</div>
				<div>
					<div style={STYLE}>
						<KolInputCheckbox _label={`Auswählen`} />
						<KolButton _variant="primary" _label="Öffnen"></KolButton>
					</div>
				</div>
			</div>
		</KolCard>
		<KolCard _label="DEBTI-25437/17-1">
			<div>
				<div>
					TeCorp Endplatte
					<br />
					VZTA
				</div>
				<div>
					<div>
						<img alt="Darstellung des KoliBri-Theming" src="/abgrenzung.jpg" width="100%" />
					</div>
				</div>
				<div>
					<div style={STYLE}>
						<KolInputCheckbox _label={`Auswählen`} />
						<KolButton _variant="primary" _label="Öffnen"></KolButton>
					</div>
				</div>
			</div>
		</KolCard>
	</div>
);
