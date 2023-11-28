import React from 'react';
import { FC } from 'react';
import { KolButton, KolToast } from '@public-ui/react';
import { ToasterServiceLegacy } from '@public-ui/components';

export const ToastBasic: FC = () => {
	const toaster = ToasterServiceLegacy.getInstance(document);

	const handleButtonClick = () => {
		toaster.enqueue({
			label: `Noch ein Toast`,
			description: `Beschreibung zum Toast`,
			type: 'info',
		});
	};
	return (
		<div>
			<KolToast _label="Legacy Toast Titel">Toast content</KolToast>
			<KolToast _label="Zweiter Toast mit Schließen-Button" _hasCloser>
				Toast content
			</KolToast>

			<KolButton _label="Weiteren Toast öffnen" _on={{ onClick: handleButtonClick }}></KolButton>
		</div>
	);
};
