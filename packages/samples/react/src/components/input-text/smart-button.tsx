import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { ToasterService } from '@public-ui/components';
import { KolInputText } from '@public-ui/react';

const smartButtonProps = {
	_icons: 'codicon codicon-info',
	_hideLabel: true,
};

const icons = {
	left: {
		icon: 'codicon codicon-arrow-left',
	},
	right: {
		icon: 'codicon codicon-arrow-right',
	},
};

export const InputTextSmartButton = () => {
	const toaster = ToasterService.getInstance(document);

	const handleClick = {
		onClick: () => {
			void toaster.enqueue({
				description: 'Smart-Button clicked',
				label: `Toaster`,
				type: 'default',
			});
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows the smart button feature for KolInputText. It allows the usage of a button inside the bnput.</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolInputText
					_label="Input with button and icons"
					_type="text"
					_smartButton={{
						...smartButtonProps,
						_label: 'Open Toast',
						_on: handleClick,
					}}
					_icons={icons}
				></KolInputText>
				<KolInputText
					_label="Disabled input with button and without icons"
					_disabled
					_type="text"
					_smartButton={{
						...smartButtonProps,
						_label: 'Disabled Button',
					}}
				></KolInputText>
			</div>
		</>
	);
};
