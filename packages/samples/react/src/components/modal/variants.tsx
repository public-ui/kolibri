import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { KolButton, KolCard, KolModal } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const ModalVariants: FC = () => {
	const [searchParams] = useSearchParams();
	const modalState = searchParams.get('show-modal') as string;
	const defaultVariant = searchParams.get('variant') as string;
	const modalRef = useRef<HTMLKolModalElement>(null);
	const stackedRef = useRef<HTMLKolModalElement>(null);
	const [variant, setVariant] = useState<'card' | 'blank'>('blank');

	useEffect(() => {
		if (modalState === 'true') {
			modalRef.current?.openModal();
		}
		if (defaultVariant === 'card') {
			setVariant(defaultVariant);
		}
	}, [modalState, defaultVariant]);

	return (
		<>
			<SampleDescription>
				<p>
					KolModal supports the variants <code>blank</code> and <code>card</code>.
				</p>
			</SampleDescription>

			<div className="flex">
				<KolModal _label="Primary modal" _width="80%" ref={modalRef} _on={{ onClose: () => console.log('Modal closed') }} _variant={variant}>
					{variant === 'card' ? (
						<KolCard _label="I am a modal.">
							<p className="mt-0">The closer button is provided by the modal.</p>
							<KolButton
								_label="Open stacked modal"
								className="mr"
								_on={{
									onClick: () => {
										stackedRef.current?.openModal();
									},
								}}
							/>
						</KolCard>
					) : (
						<div>
							<p className="mt-0">This modal has no KolCard.</p>
							<KolButton
								_label="Open stacked modal"
								className="mr"
								_on={{
									onClick: () => {
										stackedRef.current?.openModal();
									},
								}}
							/>
							<KolButton _label="Close modal" _on={{ onClick: () => modalRef.current?.closeModal() }} />
						</div>
					)}
				</KolModal>

				<KolModal _label="Stacked modal" _width="80%" ref={stackedRef} _variant="card">
					<KolCard _label="Stacked modal element">
						<KolButton
							_label="Close stacked modal"
							_on={{
								onClick: () => {
									stackedRef.current?.closeModal();
								},
							}}
						/>
					</KolCard>
				</KolModal>

				<div className="grid gap-4">
					<KolButton
						_label="Open modal"
						_on={{
							onClick: () => {
								setVariant('blank');
								modalRef.current?.openModal();
							},
						}}
					/>

					<KolButton
						_label="Open card modal"
						_on={{
							onClick: () => {
								setVariant('card');
								modalRef.current?.openModal();
							},
						}}
					/>
				</div>
			</div>
		</>
	);
};
