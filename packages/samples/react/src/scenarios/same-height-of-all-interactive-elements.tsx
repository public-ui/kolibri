import {
	KolButton,
	KolCombobox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRange,
	KolInputText,
	KolLinkButton,
	KolSelect,
	KolSingleSelect,
	KolTextarea,
} from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';

export const SameHeightOfAllInteractiveElements: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					All interactive elements, such as buttons and input fields, should have the same height to ensure a consistent and visually balanced user interface.
				</p>
			</SampleDescription>
			<div className="w-full flex flex-wrap gap-4">
				<KolButton _icons="codicon codicon-home" _label="Button" _on={dummyEventHandler} />
				<KolButton _hideLabel _icons="codicon codicon-home" _label="Button" _on={dummyEventHandler} />
				<KolLinkButton _href="#" _icons="codicon codicon-home" _label="Link-Button" _on={dummyEventHandler} />
				<KolLinkButton _hideLabel _href="#" _icons="codicon codicon-home" _label="Link-Button" _on={dummyEventHandler} />
				<KolCombobox _hideLabel _icons="codicon codicon-home" _label="Combobox" _suggestions={[]} />
				<KolInputColor
					_hideLabel
					_icons={{
						left: 'codicon codicon-home',
					}}
					_label="Input-Color"
				/>
				<KolInputFile _hideLabel _icons="codicon codicon-home" _label="Input-File" />
				<KolInputDate _hideLabel _icons="codicon codicon-home" _label="Input-Date" />
				<KolInputEmail _hideLabel _icons="codicon codicon-home" _label="Input-Email" />
				<KolInputNumber _hideLabel _icons="codicon codicon-home" _label="Input-Number" />
				<KolInputPassword _hideLabel _icons="codicon codicon-home" _label="Input-Password" />
				<KolInputRange _hideLabel _icons="codicon codicon-home" _label="Input-Range" />
				<KolInputText _hideLabel _icons="codicon codicon-home" _label="Input-Text" />
				<KolSelect _hideLabel _icons="codicon codicon-home" _label="Combobox" _options={[]} />
				<KolSingleSelect _hideLabel _icons="codicon codicon-home" _label="Combobox" _options={[]} />
				<KolTextarea _hideLabel _icons="codicon codicon-home" _label="Combobox" />
			</div>
		</>
	);
};
