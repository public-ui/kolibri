import React from 'react';

import { KolButton } from '@public-ui/react';
import type { Components } from '@public-ui/components';
import { useToasterService } from '../../../hooks/useToasterService';

export const ButtonCases = function ButtonCases(props: Partial<Components.KolButton>) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<div className="flex flex-wrap gap-4">
			<KolButton {...props} _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler}></KolButton>
			<KolButton {...props} _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler}></KolButton>
			<KolButton {...props} _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler}></KolButton>
			<KolButton {...props} _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler}></KolButton>
			<KolButton {...props} _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler}></KolButton>
			<KolButton {...props} _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler}></KolButton>
		</div>
	);
};
