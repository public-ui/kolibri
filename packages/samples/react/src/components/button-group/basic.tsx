import React from 'react';

import { KolBadge, KolButton, KolButtonGroup } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonGroupBasic: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>KolButtonGroup shows multiple KolButton-elements visually grouped together.</p>

				<p>
					<KolBadge _label="The component is deprecated and won't be available anymore in KoliBri version 3." _color="#db5461" />
				</p>
			</SampleDescription>

			<KolButtonGroup>
				<KolButton _label="Active" _variant="primary" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Not active" _disabled></KolButton>
				<KolButton _label="Active" _icons="codicon codicon-home" _variant="danger" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Active" _icons="codicon codicon-trash" _hideLabel _variant="ghost" _on={dummyEventHandler}></KolButton>
			</KolButtonGroup>
		</>
	);
};
