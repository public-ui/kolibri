import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';

export const ButtonBaselined: FC = () => (
	<div className="inline-block">
		<KolButton _label="Label-Text"></KolButton>
		<KolButton _label="Label-Text"></KolButton>
		<KolButton _label="Label-Text"></KolButton>
		<KolButton _icons="codicon codicon-reactions" _label="Label-Text with Icon"></KolButton>
	</div>
);
