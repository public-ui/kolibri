import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { KolButton, KolDialog } from '@public-ui/react-v19';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../SampleDescription';

export const DialogBasic: FC = () => {
	const [searchParams] = useSearchParams();

	const showDialog = searchParams.get('show-dialog') as string;

	type DialogHandle = {
		closeModal: () => void;
		openModal: () => void;
	};
	const isDialogHandle = (element: unknown): element is DialogHandle => {
		return typeof (element as DialogHandle)?.openModal === 'function' && typeof (element as DialogHandle)?.closeModal === 'function';
	};

	const blankRef = useRef<unknown>(null);
	const cardRef = useRef<unknown>(null);

	const onOpenBlankDialog = {
		onClick: () => {
			const handle = blankRef.current;
			if (isDialogHandle(handle)) {
				handle.openModal();
			}
		},
	};
	const onOpenCardDialog = {
		onClick: () => {
			const handle = cardRef.current;
			if (isDialogHandle(handle)) {
				handle.openModal();
			}
		},
	};
	const onCloseBlankDialog = {
		onClick: () => {
			const handle = blankRef.current;
			if (isDialogHandle(handle)) {
				handle.closeModal();
			}
		},
	};

	useEffect(() => {
		if (showDialog === 'true') {
			if (isDialogHandle(blankRef.current)) {
				blankRef.current.openModal();
			}
			if (isDialogHandle(cardRef.current)) {
				cardRef.current.openModal();
			}
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					KolDialog supports the variants <code>blank</code> and <code>card</code>. The card variant includes a <code>KolCard</code> container and a closer
					button.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<div>
					<KolButton _label="Open blank dialog" _on={onOpenBlankDialog} />
					<KolDialog ref={(element) => (blankRef.current = element)} _label="Blank dialog" _variant="blank" _width="40%">
						<div className="bg-white p-4 rounded shadow">
							<p className="mt-0">You must add styling and a close button yourself.</p>
							<KolButton _label="Open card dialog" className="mr" _on={onOpenCardDialog} />
							<KolButton _label="Close" _on={onCloseBlankDialog} />
						</div>
					</KolDialog>
				</div>

				<div>
					<KolButton _label="Open card dialog" _on={onOpenCardDialog} />
					<KolDialog ref={(element) => (cardRef.current = element)} _label="Card dialog" _variant="card" _width="30%">
						<p className="mt-0">This variant wraps content inside a KolCard.</p>
					</KolDialog>
				</div>
			</div>
		</>
	);
};
