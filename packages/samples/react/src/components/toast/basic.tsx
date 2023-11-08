import { ToasterService } from '@public-ui/components';
import { KolButton } from '@public-ui/react';
import React, { FC } from 'react';
import { getRoot } from '../../shares/react-roots';

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

export const ToastBasic: FC = () => (
	<div>
		<KolButton _label="Show simple toast" _on={{ onClick: handleButtonClickSimple }}></KolButton>
		<KolButton _label="Show complex toast" _on={{ onClick: handleButtonClickComplex }}></KolButton>
	</div>
);
