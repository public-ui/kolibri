import type { FC } from 'react';
import React from 'react';

import { KolInputText } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputTextBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputText renders a text input field. The sample shows KolInputText in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputText _value="Value" _label="First name (Black background test)" />
			</div>
			<KolInputText
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG, _label: 'test headline' }}
				_placeholder="With icons"
				_icons={{
					right: { icon: 'codicon codicon-arrow-right', style: { 'font-size': '200%', 'margin-right': 'calc(-8rem / var(--kolibri-root-font-size, 16))' } },
				}}
				_on={{ onBlur: console.log, onChange: console.log, onClick: console.log, onFocus: console.log }}
				_required
				_type="search"
				_touched
				_label="First name (text)"
				_accessKey="V"
			/>
			<KolInputText _placeholder="Placeholder" _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Search" _type="search" />
			<KolInputText _placeholder="Placeholder" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _type="url" _label="URL (url)" />
			<KolInputText _placeholder="Placeholder" _type="tel" _label="Telephone (tel)" _msg={{ _type: 'warning', _description: 'Small warning' }} />
			<KolInputText _placeholder="Placeholder" _type="tel" _label="Telephone (tel)" _msg={{ _type: 'success', _description: 'Success message' }} />
			<KolInputText _placeholder="Placeholder" _label="With counter" _maxLength={10} _value="Lorem Ipsum" />
			<KolInputText _placeholder="Placeholder" _readOnly _label="First name (text, readonly)" />
			<KolInputText _value="Value" _readOnly _label="First name (text, readonly)" />
			<KolInputText _placeholder="Placeholder" _disabled _label="First name (text, disabled)" />
			<KolInputText _value="Value" _disabled _label="First name (text, disabled)" />
			<KolInputText _value="Value" _label="With access key" _accessKey="c" />
			<KolInputText _value="Value" _label="With short key" _shortKey="s" />
		</div>
	</>
);
