/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';

import { KolButton, KolInputCheckbox, KolInputPassword, KolInputText, KolSplitButton, KolToolbar } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

import type { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const { buttonWithTextClickEventHandler } = useToasterService();

	const toolbarRef = useRef<HTMLKolToolbarElement>(null);
	const verticalRef = useRef<HTMLKolSplitButtonElement>(null);
	const horizontalRef = useRef<HTMLKolSplitButtonElement>(null);
	const loginRef = useRef<(HTMLKolSplitButtonElement & { closePopup: () => void }) | null>(null);
	const settingsRef = useRef<HTMLKolSplitButtonElement>(null);

	useEffect(() => {
		const popover = horizontalRef.current?.shadowRoot?.querySelector('kol-popover-wc') as { _align?: string } | null;
		if (popover) popover._align = 'top';
	}, []);

	useEffect(() => {
		const popover = loginRef.current?.shadowRoot?.querySelector('kol-popover-wc') as { _align?: string } | null;
		if (popover) popover._align = 'right';
	}, []);

	useEffect(() => {
		const popover = settingsRef.current?.shadowRoot?.querySelector('kol-popover-wc') as { _align?: string } | null;
		if (popover) popover._align = 'left';
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

			<div className="grid gap-8">
				<section className="flex gap-4">
					<KolSplitButton ref={verticalRef} _label="Bearbeiten" _on={handlePrimaryClick}>
						<KolToolbar class="block w-fit" ref={toolbarRef} _label="Aktionen" _items={TOOLBAR_ITEMS} _orientation="vertical" />
					</KolSplitButton>
				</section>

				<section className="flex gap-4">
					<KolSplitButton ref={horizontalRef} _label="Aktionen">
						<KolToolbar class="block w-fit" _label="Aktionen" _items={TOOLBAR_ITEMS} _orientation="horizontal" />
					</KolSplitButton>
				</section>

				<section className="flex gap-4">
					<KolSplitButton ref={loginRef} _label="Login">
						<div className="p-4 border" style={{ width: 300 }} onClick={(e) => e.stopPropagation()}>
							<div className="grid gap-4">
								<KolInputText _label="Username" />
								<KolInputPassword _label="Password" />
								<KolButton _label="Close" _on={{ onClick: () => loginRef.current?.closePopup() }} />
							</div>
						</div>
					</KolSplitButton>
				</section>

				<section className="flex gap-4">
					<KolSplitButton ref={settingsRef} _label="Einstellungen">
						<div className="p-4" style={{ width: 200 }} onClick={(e) => e.stopPropagation()}>
							<div className="grid gap-4">
								<KolInputCheckbox _variant="switch" _label="Benachrichtigungen" _checked />
								<KolInputCheckbox _variant="switch" _label="Newsletter" />
								<KolInputCheckbox _variant="switch" _label="Statistiken" />
							</div>
						</div>
					</KolSplitButton>
				</section>
			</div>
		</>
	);
};
