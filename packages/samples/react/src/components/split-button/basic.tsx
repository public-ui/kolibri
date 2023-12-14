import { ToasterService } from '@public-ui/components';
import React, { FC } from 'react';
import { KolSplitButton } from '@public-ui/react';

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
		<div className="grid gap-4">
			<KolSplitButton _label="Nur der Pfeil öffnet" className="w-200px" _on={{ onClick: handleButtonClick }}>
				Drowndown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="ohne label" _hide-label _icons="codicon codicon-git-pull-request" className="w-200px">
				Drowndown-Inhalt
			</KolSplitButton>
		</div>
	);
};
