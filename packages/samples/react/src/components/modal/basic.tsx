import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { KolButton, KolModal } from '@public-ui/react-v19';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../SampleDescription';

export const ModalBasic: FC = () => {
	const [searchParams] = useSearchParams();

	const showModal = searchParams.get('show-modal') as string;

	const blankRef = useRef<HTMLKolModalElement>(null);
	const cardRef = useRef<HTMLKolModalElement>(null);

	const onOpenBlankModal = {
		onClick: () => blankRef.current?.openModal(),
	};
	const onOpenCardModal = {
		onClick: () => cardRef.current?.openModal(),
	};
	const onCloseBlankModal = {
		onClick: () => blankRef.current?.closeModal(),
	};

	useEffect(() => {
		if (showModal === 'true') {
			blankRef.current?.openModal();
			cardRef.current?.openModal();
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					KolModal supports the variants <code>blank</code> and <code>card</code>. The card variant includes a <code>KolCard</code> container and a closer
					button.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<div>
					<KolButton _label="Open blank modal" _on={onOpenBlankModal} />
					<KolModal ref={blankRef} _label="Blank modal" _variant="blank" _width="40%">
						<div className="bg-white p-4 rounded shadow">
							<p className="mt-0">You must add styling and a close button yourself.</p>
							<KolButton _label="Open card modal" className="mr" _on={onOpenCardModal} />
							<KolButton _label="Close" _on={onCloseBlankModal} />
						</div>
					</KolModal>
				</div>

				<div>
					<KolButton _label="Open card modal" _on={onOpenCardModal} />
					<KolModal ref={cardRef} _label="Card modal" _variant="card" _width="30%">
						<p className="mt-0">This variant wraps content inside a KolCard.</p>
					</KolModal>
				</div>
			</div>
		</>
	);
};
