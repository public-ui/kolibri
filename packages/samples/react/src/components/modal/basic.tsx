import type { FC } from 'react';
import React, { useRef } from 'react';

import { KolButton, KolCard, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalBasic: FC = () => {
	const modalElement = useRef<HTMLKolModalElement>(null);

	return (
		<>
			<SampleDescription>
				<p>
					Hier ist ein Beispiel für ein Modal. Es lässt sich öffnen. Dadurch erscheint ein Popup mit Text und &apos;Schließen&apos; Button. Durch anklicken des
					&apos;Schließen&apos; Button, schließt sich das Modal wieder.
				</p>
			</SampleDescription>
			<div>
				<KolModal _label="" _width="80%" ref={modalElement} _on={{ onClose: () => console.log('Modal closed') }}>
					<KolCard _label="Ich bin ein Modal" style={{ width: '100%' }}>
						<div>
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
			</div>
		</>
	);
};
