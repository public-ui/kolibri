import React, { FC, useRef } from 'react';
import { KolButton, KolCard, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalBasic: FC = () => {
	const modalElement = useRef<HTMLKolModalElement>(null);

	return (
		<>
			<SampleDescription>
				<p>
					KolModal renders content in a popover, disabling interactivity with elements behind it. In the sample, the modal can be opened and closed using the
					buttons &quot;Open modal&quot; and &quot;Close modal&quot;.
				</p>
			</SampleDescription>
			<KolModal _ariaLabel="" _width="80%" ref={modalElement} _on={{ onClose: () => console.log('Modal closed') }}>
				<KolCard _heading="Ich bin ein Modal" style={{ width: '100%' }}>
					<div slot="content">
						<KolButton
							_label="Schließen"
							_on={{
								onClick: () => {
									if (modalElement?.current) {
										modalElement.current._activeElement = null;
									}
								},
							}}
						/>
					</div>
				</KolCard>
			</KolModal>
			<KolButton
				_label="Modal öffnen"
				_on={{
					onClick: (event: Event) => {
						if (modalElement?.current) {
							modalElement.current._activeElement = event.target as HTMLElement;
						}
					},
				}}
			/>
		</>
	);
};
