import { ToasterService } from '@public-ui/components';
import { KolButton } from '@public-ui/react';
import React, { FC } from 'react';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

export const ToastBasic: FC = () => {
	const toaster = ToasterService.getInstance(document);

	const handleButtonClickSimple = () => {
		void toaster.enqueue({
			description: 'Toasty',
			label: `Initial Toast`,
			type: 'warning',
		});
	};

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

			<div>
				<KolButton _label="Show simple toast" _on={{ onClick: handleButtonClickSimple }}></KolButton>
				<KolButton _label="Show complex toast" _on={{ onClick: handleButtonClickComplex }}></KolButton>
				<br />
				<br />
				<KolButton _label="Show toast and close after 2 seconds" _on={{ onClick: () => void handleButtonClickOpenAndClose() }}></KolButton>
				<br />
				<br />
				<KolButton _label="Close all toasts" _on={{ onClick: closeAll }}></KolButton>
			</div>
		</>
	);
};
