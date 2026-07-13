import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolDialog, KolDrawer } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const DialogScrollLock: FC = () => {
	const dialogRef = useRef<HTMLKolDialogElement>(null);
	const drawerRef = useRef<HTMLKolDrawerElement>(null);

	return (
		<>
			<SampleDescription>
				<p>
					Demonstrates that opening <strong>KolDialog</strong>/<strong>KolModal</strong> or <strong>KolDrawer</strong> modally locks the background scroll: the
					page behind the overlay must not scroll, neither via mouse wheel/touch over the backdrop nor by dragging the page scrollbar. Non-modal{' '}
					<code>show()</code> does not lock.
				</p>
				<p>
					<strong>How to test:</strong> scroll this long page down a bit, open the dialog or drawer below, then try to scroll the background (mouse wheel over
					the dimmed backdrop, or drag the scrollbar) – it should stay put. Close the overlay again and the page should scroll normally, restored to the same
					position without a layout shift.
				</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4 mb-4">
				<KolButton _label="Open modal dialog" _on={{ onClick: () => dialogRef.current?.showModal() }} />
				<KolButton _label="Open modal drawer" _on={{ onClick: () => drawerRef.current?.showModal() }} />
			</div>

			<KolDialog ref={dialogRef} _label="Scroll lock dialog" _variant="card" _width="30%">
				<p className="mt-0">While I am open, the background must not scroll.</p>
				<KolButton _label="Close" _on={{ onClick: () => dialogRef.current?.closeModal() }} />
			</KolDialog>

			<KolDrawer ref={drawerRef} _label="Scroll lock drawer" _align="right">
				<p className="mt-0">While I am open, the background must not scroll.</p>
				<KolButton _label="Close" _on={{ onClick: () => drawerRef.current?.close() }} />
			</KolDrawer>

			<div style={{ height: '200vh', flexShrink: 0 }} className="border border-dashed border-gray p-4">
				<p>This tall block simulates a long page. Scroll down, open an overlay above, and try to scroll here.</p>
			</div>
		</>
	);
};
