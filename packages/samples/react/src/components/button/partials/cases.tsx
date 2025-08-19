import * as React from 'react';

import { KolButton } from '@public-ui/react-v19';
import { useToasterService } from '../../../hooks/useToasterService';
import type { ButtonSampleProps } from './type';

export const ButtonCases: React.FC<ButtonSampleProps> = (props) => {
	const { children, ...other } = props;
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<div className="flex flex-wrap gap-4">
			<KolButton _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			<KolButton _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			<KolButton _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			<KolButton _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			<KolButton _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			<KolButton _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
		</div>
	);
};
