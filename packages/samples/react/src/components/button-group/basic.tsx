import React from 'react';

import { KolBadge, KolButton, KolButtonGroup } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const ButtonGroupBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolButtonGroup allows to visually group multiple KolButton-elements together.</p>

			<p>
				<KolBadge _label="The component is deprecated and won't be available anymore in KoliBri version 3." _color="#db5461" />
			</p>
		</SampleDescription>

		<KolButtonGroup>
			<KolButton _label="Active" _variant="primary"></KolButton>
			<KolButton _label="Not active" _disabled></KolButton>
			<KolButton _label="Active" _icons="codicon codicon-home" _variant="danger"></KolButton>
			<KolButton _label="Active" _icons="codicon codicon-trash" _hideLabel _variant="ghost"></KolButton>
		</KolButtonGroup>
	</>
);
