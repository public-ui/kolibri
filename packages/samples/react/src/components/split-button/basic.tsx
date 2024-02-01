import React from 'react';

import { ToasterService } from '@public-ui/components';
import { KolSplitButton } from '@public-ui/react';

import type { FC } from 'react';
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
		<div className="flex gap-4">
			<KolSplitButton _label="Nur der Pfeil öffnet" _on={{ onClick: handleButtonClick }}>
				Dropdown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="Schalter ohne sichtbares Label" _hideLabel _icons="codicon codicon-git-pull-request">
				Dropdown-Inhalt
			</KolSplitButton>
		</div>
	);
};
