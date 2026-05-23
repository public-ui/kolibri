import type { FC } from 'react';
import React, { useRef, useState } from 'react';

import { KolAlert, KolButton, KolDialog } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

/**
 * Demonstrates that closing a KolAlert inside a KolDialog does NOT trigger
 * the dialog's onClose callback (regression test for issue #9541).
 */
export const DialogWithAlert: FC = () => {
	const dialogRef = useRef<HTMLKolDialogElement>(null);
	const [log, setLog] = useState<string[]>([]);
	const [showAlert, setShowAlert] = useState(true);

	const appendLog = (msg: string) => setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} – ${msg}`]);

	const onOpenDialog = {
		onClick: () => {
			setShowAlert(true);
			dialogRef.current?.showModal();
		},
	};

	const onDialogClose = () => {
		appendLog('Dialog onClose fired');
	};

	const onAlertClose = () => {
		appendLog('Alert onClose fired');
		setShowAlert(false);
	};

	return (
		<>
			<SampleDescription>
				<p>
					Closing the <strong>KolAlert</strong> inside the dialog must <em>not</em> trigger the dialog&apos;s <code>onClose</code> callback. Only closing the
					dialog itself (via the card closer or <code>close()</code>) should fire that callback.
				</p>
				<p>
					Watch the event log below: after clicking the alert closer you should see <em>only</em> &quot;Alert onClose fired&quot;, not &quot;Dialog onClose
					fired&quot;.
				</p>
			</SampleDescription>

			<div className="grid gap-4">
				<div>
					<KolButton _label="Open dialog with alert" _on={onOpenDialog} />
					<KolDialog ref={dialogRef} _label="Dialog with KolAlert inside" _variant="card" _width="40%" _on={{ onClose: onDialogClose }}>
						<div className="p-4">
							{showAlert && (
								<KolAlert _label="Closeable alert" _type="info" _variant="card" _hasCloser _on={{ onClose: onAlertClose }}>
									Close this alert – the dialog must stay open and its onClose must NOT fire.
								</KolAlert>
							)}
							{!showAlert && <p>Alert was closed. The dialog is still open – correct behaviour!</p>}
						</div>
					</KolDialog>
				</div>

				{log.length > 0 && (
					<div>
						<strong>Event log:</strong>
						<ul>
							{log.map((entry, i) => (
								<li key={i}>{entry}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};
