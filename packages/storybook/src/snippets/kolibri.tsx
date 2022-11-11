import { KolAbbr } from '@public-ui/react';
import React, { FunctionComponent } from 'react';

export const KoliBri: FunctionComponent<unknown> = () => {
	return (
		<strong>
			<KolAbbr _tooltip-align="right" _title="Komponenten-Bibliothek für die Barrierefreiheit">
				KoliBri
			</KolAbbr>
		</strong>
	);
};
