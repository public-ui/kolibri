import React, { FC } from 'react';
import { KolSplitButton } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const SplitButtonBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					SplitButton renders a button with an additional context-menu, that can be opened by clicking the arrow icon. The first sample shows the button with an
					assigned action. In the second sample no action is assigned and clicking the button opens the context menu instead.
				</p>
			</SampleDescription>
			<KolSplitButton _label="Nur der Pfeil öffnet" _on={{ onClick: console.log }}>
				Drowndown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="ohne label" _hide-label _icons="codicon codicon-git-pull-request">
				Drowndown-Inhalt
			</KolSplitButton>
			<KolSplitButton _label="schon offen" _show>
				Dropdown initial sichtbar
			</KolSplitButton>
		</>
	);
};
