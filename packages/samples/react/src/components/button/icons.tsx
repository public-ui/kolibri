import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonIcons: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolButton with icons in all alignments.</p>
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
				_on={dummyEventHandler}
			/>
		</>
	);
};
