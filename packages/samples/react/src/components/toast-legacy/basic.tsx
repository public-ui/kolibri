import React from 'react';
import { FC } from 'react';
import { KolBadge, KolButton, KolToast } from '@public-ui/react';
import { ToasterServiceLegacy } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';

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
		<>
			<SampleDescription>
				<p>This sample shows the legacy KolToast component.</p>
				<p>
					<KolBadge _label="The component is deprecated and won't be available anymore in KoliBri version 3." _color="#db5461" />
				</p>
			</SampleDescription>
			<div>
				<KolToast _label="Legacy Toast Titel">Toast content</KolToast>
				<KolToast _label="Zweiter Toast mit Schließen-Button" _hasCloser>
					Toast content
				</KolToast>

				<KolButton _label="Weiteren Toast öffnen" _on={{ onClick: handleButtonClick }}></KolButton>
			</div>
		</>
	);
};
