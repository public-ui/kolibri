import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlertTypePropType } from '@public-ui/components';
import { ToasterService } from '@public-ui/components';
import { KolAlert, KolButton, KolLink } from '@public-ui/react-v19';

import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const ToastBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultType = searchParams.get('type') as AlertTypePropType;
	const toaster = ToasterService.getInstance(document);
	const handleButtonClickSimple = () => {
		void toaster.enqueue({
			description: 'Toasty',
			label: `Initial Toast`,
			type: 'warning',
			onClose: () => {
				console.log('Simple toast has been closed.');
			},
		});
	};

	useEffect(() => {
		if (defaultType) {
			void toaster.enqueue({
				description: 'Toasty',
				label: `Toast with type '${defaultType}'`,
				type: defaultType,
			});
		}
	}, [defaultType, toaster]);

	const handleButtonClickComplex = () => {
		void toaster.enqueue({
			render: (element: HTMLElement, { close }) => {
				getRoot(element).render(
					<>
						<KolButton
							_label={'Hello World from Toast!'}
							_on={{
								onClick: () => {
									console.log('Toast Button clicked!');
									close();
								},
							}}
						/>
					</>,
				);
			},
			label: `Initial Toast`,
			type: 'warning',
		});
	};

	const handleButtonClickOpenAndClose = async () => {
		const close = await toaster.enqueue({
			description: 'I will disappear in two seconds...',
			label: `Good Bye`,
			type: 'warning',
		});

		if (close) {
			setTimeout(close, 2000);
		}
	};

	const closeAll = () => {
		toaster.closeAll();
	};

	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates the toast service with all its options.</p>
			</SampleDescription>
			<KolAlert _label="Component is DEPRECATED" _type="error" _variant="card">
				For more information please refer
				<KolLink _href="https://public-ui.github.io/docs/components/toaster" _target="_blank">
					to the documentation
				</KolLink>
				.
			</KolAlert>

			<section className="grid gap-4">
				<div className="flex flex-wrap gap-2">
					<KolButton _label="Show simple toast" _on={{ onClick: handleButtonClickSimple }}></KolButton>
					<KolButton _label="Show complex toast" _on={{ onClick: handleButtonClickComplex }}></KolButton>
					<KolButton _label="Show toast and close after 2 seconds" _on={{ onClick: () => void handleButtonClickOpenAndClose() }}></KolButton>
					<KolButton _label="Close all toasts" _on={{ onClick: closeAll }}></KolButton>
				</div>
			</section>
		</>
	);
};
