import * as React from 'react';
import { SampleDescription } from '../SampleDescription';
import type { FC } from 'react';
import type { ButtonProps } from '@public-ui/components/src';
import { ToasterService } from '@public-ui/components';
import { KolInputText } from '@public-ui/react';

export const InputTextSmartButton: FC = () => {
	const toaster = ToasterService.getInstance(document);

	const smartButton: ButtonProps = {
		_icons: 'codicon codicon-info',
		_hideLabel: true,
		_label: 'Alert',
		_on: {
			onClick: (_event, _value) => {
				void toaster.enqueue({
					description: 'Smart-Button Clicked',
					label: `Toaster`,
				});
			},
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows the _smartButton feature for KolInputText. It allows the usage of a Button inside the Input.</p>
			</SampleDescription>

			<KolInputText _label="With Smart Button" _type="text" _smartButton={smartButton}></KolInputText>
		</>
	);
};
