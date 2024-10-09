import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import { ToasterService } from '@public-ui/components';
import { KolInputText } from '@public-ui/react';

export const InputTextSmartButton = () => {
	const toaster = ToasterService.getInstance(document);

	const smartButton = {
		_icons: 'codicon codicon-info',
		_hideLabel: true,
		_label: 'Alert',
		_on: {
			onClick: () => {
				void toaster.enqueue({
					description: 'Smart-Button clicked',
					label: `Toaster`,
					type: 'default',
				});
			},
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows the smart button feature for KolInputText. It allows the usage of a button inside the bnput.</p>
			</SampleDescription>

			<KolInputText _label="With Smart Button" _type="text" _smartButton={smartButton}></KolInputText>
		</>
	);
};
