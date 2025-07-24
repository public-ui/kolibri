import type { FC } from 'react';
import React from 'react';

import { KolInputColor } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG } from '../../shares/constants';

export const InputColorBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputColor renders a color input. The sample shows KolInputColor in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolInputColor
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_icons={{ left: 'codicon codicon-symbol-color' }}
					_label="Color (Black background test)"
					_value="#f08080"
				/>
			</div>
			<KolInputColor
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Color with error"
				_suggestions="['#000000','#f08080', '#0000ff','#00ff00']"
				_touched
			/>
			<KolInputColor _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Color" />
			<KolInputColor _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Color" />
			<KolInputColor _msg={{ _type: 'success', _description: 'Success message' }} _label="Color" />
			<KolInputColor _accessKey="C" _hint="Hint text" _label="Color with hint" _value="#f08080" />
			<KolInputColor _disabled _label="Color (Disabled)" _value="#f08080" />
			<KolInputColor _label="With access key" _accessKey="c"></KolInputColor>
			<KolInputColor _label="With short key" _shortKey="s"></KolInputColor>
		</div>
	</>
);
