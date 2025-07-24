import type { FC } from 'react';
import React from 'react';

import { KolInputFile } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const InputFileBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputFile renders a file input field. The sample shows KolInputFile in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputFile _label="Upload file (Black background test)" _icons={{ left: { icon: 'codicon codicon-save' } }} _touched />
			</div>
			<KolInputFile
				_required
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Upload file (Black background test)"
				_icons={{ left: { icon: 'codicon codicon-save' } }}
				_touched
			/>
			<KolInputFile _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Upload file" />
			<KolInputFile _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Upload file" />
			<KolInputFile _msg={{ _type: 'success', _description: 'Success message' }} _label="Upload file" />
			<KolInputFile _accessKey="h" _multiple _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Upload file (Multiple)" />
			<KolInputFile _disabled _label="Upload file (Disabled)" />
			<KolInputFile _label="With access key" _accessKey="c" />
			<KolInputFile _label="With short key" _shortKey="s" />
		</div>
	</>
);
