import React from 'react';

import { KolButton } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonBaselined: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This KolButton sample is used for internal testing purposes: It features multiple buttons with and without icons which are vertically aligned.</p>
			</SampleDescription>

			<div className="flex">
				<KolButton _label="Label-Text" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Label-Text" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Label-Text" _on={dummyEventHandler}></KolButton>
				<KolButton _icons="codicon codicon-reactions" _label="Label-Text with Icon" _on={dummyEventHandler}></KolButton>
			</div>
		</>
	);
};
