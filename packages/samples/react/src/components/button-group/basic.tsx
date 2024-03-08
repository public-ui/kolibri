import React from 'react';

import { KolButton, KolButtonGroup } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const ButtonGroupBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden Vier verschiedene Buttons angezeigt. Drei davon lassen sich anklicken und in den Status Active versetzen.</p>
		</SampleDescription>
		<KolButtonGroup>
			<KolButton _label="Active" _variant="primary"></KolButton>
			<KolButton _label="Not active" _disabled></KolButton>
			<KolButton _label="Active" _icons="codicon codicon-home" _variant="danger"></KolButton>
			<KolButton _label="Active" _icons="codicon codicon-trash" _hideLabel _variant="ghost"></KolButton>
		</KolButtonGroup>
	</>
);
