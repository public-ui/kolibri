import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ToasterService } from '@public-ui/components';
import { KolButton } from '@public-ui/react';
import type { AlertType, AlertVariant } from '@public-ui/components';

import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const ToastBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultType = searchParams.get('type') as AlertType;
	const defaultVariant = searchParams.get('variant') as AlertVariant;
	const toaster = ToasterService.getInstance(document);
	const handleButtonClickSimple = () => {
		void toaster.enqueue({
			description: 'Toasty',
			label: `Initial Toast`,
			type: 'warning',
		});
	};

	const handleButtonClickVariantMessage = () => {
		void toaster.enqueue({
			description: 'Toasty',
			label: `Toast with variant 'msg'`,
			type: 'warning',
			variant: 'msg',
		});
	};

	useEffect(() => {
		if (defaultType && defaultVariant) {
			void toaster.enqueue({
				description: 'Toasty',
				label: `Toast with variant 'msg'`,
				type: defaultType,
				variant: defaultVariant,
			});
		} else if (defaultType) {
			void toaster.enqueue({
				description: 'Toasty',
				label: `Initial Toast`,
				type: defaultType,
			});
		} else if (defaultVariant) {
			void toaster.enqueue({
				description: 'Toasty',
				label: `Initial Toast`,
				type: 'default',
				variant: defaultVariant,
			});
		}
	}, [defaultType, defaultVariant]);

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

			<section className="grid gap-4">
				<section className="flex gap-2">
					<KolButton _label="Show simple toast" _on={{ onClick: handleButtonClickSimple }}></KolButton>
					<KolButton _label="Show toast with alert variant 'msg'" _on={{ onClick: handleButtonClickVariantMessage }}></KolButton>
					<KolButton _label="Show complex toast" _on={{ onClick: handleButtonClickComplex }}></KolButton>
				</section>
				<section className="flex gap-2">
					<KolButton _label="Show toast and close after 2 seconds" _on={{ onClick: () => void handleButtonClickOpenAndClose() }}></KolButton>
				</section>
				<section className="flex gap-2">
					<KolButton _label="Close all toasts" _on={{ onClick: closeAll }}></KolButton>
				</section>
			</section>
		</>
	);
};
