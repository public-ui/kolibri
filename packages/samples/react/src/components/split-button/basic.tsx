import React from 'react';

import { ToasterService } from '@public-ui/components';
import { KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const toaster = ToasterService.getInstance(document);
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
			<div className="flex gap-4">
				<KolSplitButton _label="Nur der Pfeil öffnet" _on={{ onClick: handleButtonClick }}>
					Dropdown-Inhalt
				</KolSplitButton>
				<KolSplitButton _label="Schalter ohne sichtbares Label" _hideLabel _icons="codicon codicon-git-pull-request">
					Dropdown-Inhalt
				</KolSplitButton>
			</div>
		</>
	);
};
