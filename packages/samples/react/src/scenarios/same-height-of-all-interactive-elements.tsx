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
} from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { useToasterService } from '../hooks/useToasterService';

const OPTIONS = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

const SUGGESTIONS = ['Option 1', 'Option 2', 'Option 3'];

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
			<div className="w-full flex flex-row gap-4 items-end">
				<KolCombobox className="min-w-[13em]" _icons="codicon codicon-home" _label="Combobox" _suggestions={SUGGESTIONS} _value="Option 2" />
				<KolInputColor
					className="min-w-[10em]"
					_icons={{
						left: 'codicon codicon-home',
					}}
					_label="Input-Color"
				/>
				<KolInputFile className="min-w-[15em]" _icons="codicon codicon-home" _label="Input-File" />
				<KolInputDate className="min-w-[12em]" _icons="codicon codicon-home" _label="Input-Date" />
				<KolInputEmail className="min-w-[10em]" _icons="codicon codicon-home" _label="Input-Email" />
				<KolInputNumber className="min-w-[10em]" _icons="codicon codicon-home" _label="Input-Number" />
				<KolInputPassword className="min-w-[10em]" _icons="codicon codicon-home" _label="Input-Password" />
				<KolInputRange className="min-w-[15em]" _icons="codicon codicon-home" _label="Input-Range" />
				<KolInputText className="min-w-[10em]" _icons="codicon codicon-home" _label="Input-Text" />
				<KolSelect className="min-w-[10em]" _icons="codicon codicon-home" _label="Select" _options={OPTIONS} />
				<KolSingleSelect className="min-w-[14em]" _icons="codicon codicon-home" _label="Single-Select" _options={OPTIONS} _value="option2" />
				<KolTextarea className="min-w-[10em]" _icons="codicon codicon-home" _label="Textarea" />
				<KolButton className="min-w-[10em]" _icons="codicon codicon-home" _label="Button" _on={dummyEventHandler} />
				<KolButton _hideLabel _icons="codicon codicon-home" _label="Button" _on={dummyEventHandler} />
				<KolLinkButton className="min-w-[15em]" _href="#" _icons="codicon codicon-home" _label="Link-Button" _on={dummyEventHandler} />
				<KolLinkButton _hideLabel _href="#" _icons="codicon codicon-home" _label="Link-Button" _on={dummyEventHandler} />
			</div>
		</>
	);
};
