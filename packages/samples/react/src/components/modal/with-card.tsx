import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolCard, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalWithCard: FC = () => {
	const modalRef = useRef<HTMLKolModalElement>(null);
	return (
		<>
			<SampleDescription>
				<p>
					KolModal with variant <code>card</code> shows a closer button.
				</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolModal _label="Card modal" _width="80%" ref={modalRef} _variant="card">
					<KolCard _label="Modal content">
						<p className="mt-0">The closer button is provided by the modal.</p>
					</KolCard>
				</KolModal>
				<KolButton _label="Open modal" _on={{ onClick: () => modalRef.current?.openModal() }} />
			</div>
		</>
	);
};
