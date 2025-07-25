import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolCard, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalVariants: FC = () => {
	const blankRef = useRef<HTMLKolModalElement>(null);
	const cardRef = useRef<HTMLKolModalElement>(null);
	return (
		<>
			<SampleDescription>
				<p>
					KolModal supports the variants <code>blank</code> and <code>card</code>.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<div className="flex gap-4">
					<KolModal _label="Blank modal" _width="80%" ref={blankRef}>
						<div>
							<p className="mt-0">This modal has no KolCard.</p>
							<KolButton _label="Close modal" _on={{ onClick: () => blankRef.current?.closeModal() }} />
						</div>
					</KolModal>
					<KolButton _label="Open modal" _on={{ onClick: () => blankRef.current?.openModal() }} />
				</div>

				<div className="flex gap-4">
					<KolModal _label="Card modal" _width="80%" ref={cardRef} _variant="card">
						<KolCard _label="Modal content">
							<p className="mt-0">The closer button is provided by the modal.</p>
						</KolCard>
					</KolModal>
					<KolButton _label="Open modal" _on={{ onClick: () => cardRef.current?.openModal() }} />
				</div>
			</div>
		</>
	);
};
