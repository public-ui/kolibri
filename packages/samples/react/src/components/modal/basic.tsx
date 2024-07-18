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
					KolModal renders content in a popover, disabling interactivity with elements behind it. In the sample, the modal can be opened and closed using the
					buttons &quot;Open modal&quot; and &quot;Close modal&quot;.
				</p>
			</SampleDescription>

			<div>
				<KolModal _label="" _width="80%" ref={modalElement} _on={{ onClose: () => console.log('Modal closed') }}>
					<KolCard _label="I am a modal." style={{ width: '100%' }}>
						<div>
							<KolButton
								_label="Close modal"
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
					_label="Open modal"
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
