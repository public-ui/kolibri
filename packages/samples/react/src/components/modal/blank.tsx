import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalBlank: FC = () => {
	const modalRef = useRef<HTMLKolModalElement>(null);
	return (
		<>
			<SampleDescription>
				<p>Example of a KolModal without a KolCard.</p>
			</SampleDescription>

			<div className="flex gap-4">
				<KolModal _label="Blank modal" _width="80%" ref={modalRef}>
					<div>
						<p className="mt-0">This modal has no KolCard.</p>
						<KolButton _label="Close modal" _on={{ onClick: () => modalRef.current?.closeModal() }} />
					</div>
				</KolModal>
				<KolButton _label="Open modal" _on={{ onClick: () => modalRef.current?.openModal() }} />
			</div>
		</>
	);
};
