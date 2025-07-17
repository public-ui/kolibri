import React from 'react';

import { KolSplitButton, KolToolbar } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();

	const TOOLBAR_ITEMS = [
		{ _label: 'Speichern', _on: { onClick: buttonWithTextClickEventHandler } },
		{ _label: 'Verschieben', _on: { onClick: buttonWithTextClickEventHandler } },
		{ _label: 'Löschen', _on: { onClick: buttonWithTextClickEventHandler } },
	];

	const handlePrimaryClick = {
		onClick: buttonWithTextClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>SplitButton renders a button with an additional context-menu that opens a list of actions.</p>
			</SampleDescription>

			<KolSplitButton _label="Bearbeiten" _on={handlePrimaryClick}>
				<KolToolbar _label="Aktionen" _items={TOOLBAR_ITEMS} _orientation="vertical" />
			</KolSplitButton>
		</>
	);
};
