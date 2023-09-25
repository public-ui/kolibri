import React, { FC } from 'react';
import { KolSplitButton } from '@public-ui/react';

export const SplitButtonBasic: FC = () => {
	return (
		<div className="grid gap-4">
			<KolSplitButton _label="Nur der Pfeil öffnet" _onClick={console.log}>
				Drowndown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="ohne label" _hide-label _icon="codicon codicon-git-pull-request">
				Drowndown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="schon offen" _show>
				Dropdown initial sichtbar
			</KolSplitButton>
		</div>
	);
};
