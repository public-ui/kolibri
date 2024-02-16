import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ButtonIcons: FC = () => (
	<>
		<SampleDescription>
			<p>Hier wird ein Button mit dem Label &apos;Label&apos; angezeigt. Beim anklicken wird ein alert als Popup ausgeführt. </p>
		</SampleDescription>
		<KolButton
			_icons={{
				bottom: 'codicon codicon-arrow-down',
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				top: {
					style: {
						'font-size': '200%',
						transform: 'rotate(45deg)',
					},
					icon: 'codicon codicon-arrow-up',
				},
				right: 'codicon codicon-arrow-right',
			}}
			_label="Label"
			_on={{
				onClick: (_event, _value) => alert('Klick!'),
			}}
		/>
	</>
);
