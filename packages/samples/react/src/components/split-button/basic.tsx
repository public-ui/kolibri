import React from 'react';

import { ToasterService } from '@public-ui/components';
import { KolButton, KolInputText, KolSplitButton } from '@public-ui/react';
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
					SplitButton renders a button with an additional context-menu, that can be opened by clicking the arrow icon. The first sample shows the button with an
					assigned action. In the second sample no action is assigned and clicking the button opens the context menu instead.
				</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolSplitButton _label="Only the arrow opens" _on={{ onClick: handleButtonClick }}>
					Dropdown-Inhalt
				</KolSplitButton>
				<KolSplitButton _label="Button without visible label" _hideLabel _icons="codicon codicon-git-pull-request">
					Dropdown-Inhalt
				</KolSplitButton>
				<KolButton _label='Test'></KolButton>
				<KolInputText _label='Irgendwas'></KolInputText>
				<input />
			</div>
		</>
	);
};
