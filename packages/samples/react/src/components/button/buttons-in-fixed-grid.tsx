import { KolButton, KolLinkButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useAlert } from '../../hooks/useAlert';
import { SampleDescription } from '../SampleDescription';

export const ButtonInFixedGrid: FC = () => {
	const { dummyClickEventHandler } = useAlert();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>All this buttons are in a grid with fixed height (60px) and width (25% of screen) and should accept this dimensions.</p>
			</SampleDescription>
			<div className="grid gap-4 fixed-height-grid">
				<KolButton _variant="primary" _icons="kolicon-house" _label="Button" _on={dummyEventHandler} />
				<KolButton _variant="primary" _hideLabel _icons="kolicon-house" _label="Button" _on={dummyEventHandler} />
				<KolLinkButton _variant="primary" _href="#" _icons="kolicon-house" _label="Link-Button" _on={dummyEventHandler} />
				<KolLinkButton _variant="primary" _hideLabel _href="#" _icons="kolicon-house" _label="Link-Button" _on={dummyEventHandler} />
			</div>
		</>
	);
};
