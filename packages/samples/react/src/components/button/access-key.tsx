import { KolButton } from '@public-ui/react';
import React, { FC } from 'react';

export const ButtonAccessKey: FC = () => (
	<KolButton
		_label="Mit access key"
		_accessKey="s"
		_on={{
			onClick: () => {
				console.log('clicked!');
			},
		}}
	></KolButton>
);
