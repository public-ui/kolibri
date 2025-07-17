import React, { useEffect, useRef } from 'react';
import { KolSplitButton, KolToolbar } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

import type { FC } from 'react';

export const SplitButtonToolbarHorizontal: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();
	const splitButtonRef = useRef<HTMLKolSplitButtonElement>(null);
	const toolbarRef = useRef<HTMLKolToolbarElement>(null);

	useEffect(() => {
		const popover = splitButtonRef.current?.shadowRoot?.querySelector('kol-popover-wc') as { _align?: string } | null;
		if (popover) popover._align = 'top';
	}, []);

	useEffect(() => {
		const arrowButton = splitButtonRef.current?.shadowRoot?.querySelector('.kol-split-button__secondary-button');
		const focusFirst = () => {
			setTimeout(() => {
				const firstItem = toolbarRef.current?.shadowRoot?.querySelector('.kol-toolbar__item') as (HTMLElement & { kolFocus?: () => void }) | null;
				firstItem?.kolFocus?.();
			});
		};
		const keyHandler = (event: KeyboardEvent) => {
			if (['Enter', 'Space', ' '].includes(event.code) || ['Enter', ' '].includes(event.key)) {
				focusFirst();
			}
		};
		arrowButton?.addEventListener('click', focusFirst);
		arrowButton?.addEventListener('keydown', keyHandler as EventListener);
		return () => {
			arrowButton?.removeEventListener('click', focusFirst);
			arrowButton?.removeEventListener('keydown', keyHandler as EventListener);
		};
	}, []);

	const TOOLBAR_ITEMS = [
		{ _label: 'Bearbeiten', _on: { onClick: buttonWithTextClickEventHandler } },
		{ _label: 'Kopieren', _on: { onClick: buttonWithTextClickEventHandler } },
		{ _label: 'Löschen', _on: { onClick: buttonWithTextClickEventHandler } },
	];

	return (
		<>
			<SampleDescription>
				<p>The popover contains a horizontal toolbar.</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolSplitButton ref={splitButtonRef} _label="Aktionen">
					<KolToolbar class="block w-fit" ref={toolbarRef} _label="Aktionen" _items={TOOLBAR_ITEMS} _orientation="horizontal" />
				</KolSplitButton>
			</div>
		</>
	);
};
