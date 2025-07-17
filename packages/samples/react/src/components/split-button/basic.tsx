import React, { useEffect, useRef } from 'react';

import { KolSplitButton, KolToolbar } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();

	const splitButtonRef = useRef<HTMLKolSplitButtonElement>(null);
	const toolbarRef = useRef<HTMLKolToolbarElement>(null);

	useEffect(() => {
		const arrowButton = splitButtonRef.current?.shadowRoot?.querySelector('.kol-split-button__secondary-button');

		const focusFirstToolbarItem = () => {
			setTimeout(() => {
				const firstItem = toolbarRef.current?.shadowRoot?.querySelector('.kol-toolbar__item') as (HTMLElement & { kolFocus?: () => void }) | null;
				firstItem?.kolFocus?.();
			});
		};

		const keyHandler = (event: KeyboardEvent) => {
			if (['Enter', 'Space', ' '].includes(event.code) || ['Enter', ' '].includes(event.key)) {
				focusFirstToolbarItem();
			}
		};

		arrowButton?.addEventListener('click', focusFirstToolbarItem);
		arrowButton?.addEventListener('keydown', keyHandler as EventListener);
		return () => {
			arrowButton?.removeEventListener('click', focusFirstToolbarItem);
			arrowButton?.removeEventListener('keydown', keyHandler as EventListener);
		};
	}, []);

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

			<div className="flex gap-4">
				<KolSplitButton ref={splitButtonRef} _label="Bearbeiten" _on={handlePrimaryClick}>
					<KolToolbar class="block w-fit" ref={toolbarRef} _label="Aktionen" _items={TOOLBAR_ITEMS} _orientation="vertical" />
				</KolSplitButton>
			</div>
		</>
	);
};
