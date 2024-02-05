import { ToasterService } from '@public-ui/components';
import React, { FC } from 'react';
import { KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const toaster = ToasterService.getInstance(document);

export const SplitButtonBasic: FC = () => {
	const handleButtonClick = () => {
		void toaster.enqueue({
			description: 'The Button has been clicked.',
			label: `Button Clicked`,
			type: 'info',
		});
	};

	return (
		<>
			<SampleDescription>
				<p>
					Hier sind zwei Dropdownmenüs. Das obere Beispiel lässt sich nur durch drücken des Pfeils öffnen. Ansonsten erscheint eine Meldung. Beim unteren
					Beispiel kann durch drücken auf das Icon und des Pfeils das Menü geöffnet und geschlossen werden.
				</p>
			</SampleDescription>
			<div className="grid gap-4">
				<KolSplitButton _label="Nur der Pfeil öffnet" className="w-200px" _on={{ onClick: handleButtonClick }}>
					Drowndown-Inhalt
				</KolSplitButton>
				<KolSplitButton _label="ohne label" _hide-label _icons="codicon codicon-git-pull-request" className="w-200px">
					Drowndown-Inhalt
				</KolSplitButton>
			</div>
		</>
	);
};
