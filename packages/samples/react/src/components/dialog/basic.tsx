import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { KolButton, KolDialog } from '@public-ui/react-v19';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../SampleDescription';

export const DialogBasic: FC = () => {
	const [searchParams] = useSearchParams();

	const showDialog = searchParams.get('show-dialog') as string;

	const blankRef = useRef<HTMLKolDialogElement>(null);
	const cardRef = useRef<HTMLKolDialogElement>(null);

	const onOpenBlankDialog = {
		onClick: () => blankRef.current?.openModal(),
	};
	const onOpenCardDialog = {
		onClick: () => cardRef.current?.openModal(),
	};
	const onCloseBlankDialog = {
		onClick: () => blankRef.current?.closeModal(),
	};

	useEffect(() => {
		if (showDialog === 'true') {
			blankRef.current?.openModal();
			cardRef.current?.openModal();
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
					<KolDialog ref={blankRef} _label="Blank dialog" _variant="blank" _width="40%">
						<div className="bg-white p-4 rounded shadow">
							<p className="mt-0">You must add styling and a close button yourself.</p>
							<KolButton _label="Open card dialog" className="mr" _on={onOpenCardDialog} />
							<KolButton _label="Close" _on={onCloseBlankDialog} />
						</div>
					</KolDialog>
				</div>

				<div>
					<KolButton _label="Open card dialog" _on={onOpenCardDialog} />
					<KolDialog ref={cardRef} _label="Card dialog" _variant="card" _width="30%" _level={2}>
						<p className="mt-0">This variant wraps content inside a KolCard.</p>
					</KolDialog>
				</div>
			</div>
		</>
	);
};
