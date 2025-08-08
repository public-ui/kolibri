import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalBasic: FC = () => {
	const blankRef = useRef<HTMLKolModalElement>(null);
	const cardRef = useRef<HTMLKolModalElement>(null);

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
					<KolButton _label="Open blank modal" _on={{ onClick: () => blankRef.current?.openModal() }} />
					<KolModal ref={blankRef} _label="Blank modal" _variant="blank" _width="80%">
						<div className="bg-white p-4 rounded shadow">
							<p className="mt-0">You must add styling and a close button yourself.</p>
							<KolButton _label="Close" _on={{ onClick: () => blankRef.current?.closeModal() }} />
						</div>
					</KolModal>
				</div>

				<div>
					<KolButton _label="Open card modal" _on={{ onClick: () => cardRef.current?.openModal() }} />
					<KolModal ref={cardRef} _label="Card modal" _variant="card" _width="80%">
						<p className="mt-0">This variant wraps content inside a KolCard.</p>
					</KolModal>
				</div>
			</div>
		</>
	);
};
