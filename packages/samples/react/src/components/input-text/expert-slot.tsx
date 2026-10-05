import { KolBadge, KolIcon, KolInputText, KolPopoverButton } from '@public-ui/react-v19';
import * as React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextExpertSlot = () => {
	return (
		<div className="grid gap-4">
			<SampleDescription>
				<p>This sample shows KolInputText with expert slot. The expert slot allows for complex custom content beyond simple text inputs.</p>
				<p>
					For further information on the expert slot see its <a href="https://public-ui.github.io/docs/concepts/expert-slot">documentation</a>
				</p>
			</SampleDescription>

			<SampleBlock id="text">
				<KolInputText _label="" _type="text">
					<span slot="expert">I am more than just a input field</span>
				</KolInputText>
			</SampleBlock>
			<SampleBlock id="badge">
				<KolInputText _label="" _type="text" _value="Complex example">
					<div slot="expert" className="flex items-center gap-2">
						<KolBadge _label="Premium" _color="#1a73e8" />
						<KolIcon _icons="kolicon-check" _label="" />
						<span>Verified account with premium features</span>
					</div>
				</KolInputText>
			</SampleBlock>
			<SampleBlock id="note">
				<KolInputText _label="" _type="text" _placeholder="Enter your email">
					<div slot="expert" style={{ padding: '0.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
						<strong>Note:</strong> This email will be used for account recovery and notifications.
					</div>
				</KolInputText>
			</SampleBlock>
			<SampleBlock id="required">
				<KolInputText _label="" _type="text" _required>
					<div slot="expert" className="inline-block">
						<span className="expert-slot-required-label">Username</span>
						<KolPopoverButton _label="Help" _icons="kolicon-alert-info" _variant="ghost" _hideLabel _inline>
							<div className="w-sm p-2 border border-solid border-gray">You have to take care of the asterics on your own!</div>
						</KolPopoverButton>
					</div>
				</KolInputText>
			</SampleBlock>
			<SampleBlock id="readonly">
				<KolInputText _label="" _type="text" _readOnly _value="(read only) is also not appended">
					<div slot="expert" className="inline-block">
						<span className="expert-slot-required-label">Username</span>
						<KolPopoverButton _label="Help" _icons="kolicon-alert-info" _variant="ghost" _hideLabel _inline>
							<div className="w-sm p-2 border border-solid border-gray">Readonly is also not appended</div>
						</KolPopoverButton>
					</div>
				</KolInputText>
			</SampleBlock>
		</div>
	);
};
