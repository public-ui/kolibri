import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonBaselined: FC = () => (
	<>
		<SampleDescription>
			<p>This KolButton sample is used for internal testing purposes: It features multiple buttons with and without icons which are vertically aligned.</p>
		</SampleDescription>

		<div className="inline-block">
			<KolButton _label="Label-Text"></KolButton>
			<KolButton _label="Label-Text"></KolButton>
			<KolButton _label="Label-Text"></KolButton>
			<KolButton _icons="codicon codicon-reactions" _label="Label-Text with Icon"></KolButton>
		</div>
	</>
);
