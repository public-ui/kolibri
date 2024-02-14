import type { Components } from '@public-ui/components';
import React, { forwardRef } from 'react';

import { KolButton } from '@public-ui/react';

export const ButtonCases = forwardRef<HTMLKolButtonElement, Components.KolButton>(function InputCheckboxCases(props, ref) {
	return (
		<div className="flex flex-wrap gap-4">
			<KolButton {...props} _icons="codicon codicon-home" _label="Primary" _variant="primary"></KolButton>
			<KolButton {...props} _icons="codicon codicon-heart" _label="Secondary" _variant="secondary"></KolButton>
			<KolButton {...props} _icons="codicon codicon-hubot" _label="Normal" _variant="normal"></KolButton>
			<KolButton {...props} _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary"></KolButton>
			<KolButton {...props} _icons="codicon codicon-trash" _label="Danger" _variant="danger"></KolButton>
			<KolButton ref={ref} {...props} _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost"></KolButton>
		</div>
	);
});
