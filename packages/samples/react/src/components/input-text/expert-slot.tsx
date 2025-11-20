import { KolBadge, KolIcon, KolInputText } from '@public-ui/react-v19';
import * as React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextExpertSlot = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolInputText with expert slot. The expert slot allows for complex custom content beyond simple text inputs.</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolInputText _label="" _type="text">
					<span slot="expert">I am more than just a input field</span>
				</KolInputText>

				<KolInputText _label="" _type="text" _value="Complex example">
					<div slot="expert" className="flex items-center gap-2">
						<KolBadge _label="Premium" _color="#1a73e8" />
						<KolIcon _icons="codicon codicon-verified-filled" _label="" />
						<span>Verified account with premium features</span>
					</div>
				</KolInputText>

				<KolInputText _label="" _type="text" _placeholder="Enter your email">
					<div slot="expert" style={{ padding: '0.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
						<strong>Note:</strong> This email will be used for account recovery and notifications.
					</div>
				</KolInputText>
			</div>
		</>
	);
};
