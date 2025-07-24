import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const TextareaBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolTextarea renders a text field. The sample shows KolTextarea in a form context with different variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolTextarea _placeholder="Placeholder" _label="Text" />
			</div>
			<KolTextarea _placeholder="Placeholder" _required _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Text" _touched _hint={HINT_MSG} />
			<KolTextarea _placeholder="Placeholder" _label="Text" _msg={{ _type: 'info', _description: 'Just a hint' }} />
			<KolTextarea _placeholder="Placeholder" _label="Text" _msg={{ _type: 'warning', _description: 'Small warning' }} />
			<KolTextarea _placeholder="Placeholder" _label="Text" _msg={{ _type: 'success', _description: 'Success message' }} />
			<KolTextarea _accessKey="T" _label="Text (3 rows)" _rows={3} />
			<KolTextarea _label="Text (placeholder)" _rows={3} _placeholder="Placeholder" />
			<KolTextarea _label="Text (disabled & placeholder)" _rows={3} _placeholder="Placeholder" _disabled />
			<KolTextarea _label="Text (readonly)" _rows={3} _placeholder="Placeholder" _readOnly />
			<KolTextarea _label="Text (disabled & value)" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _disabled />
			<KolTextarea _label="With access key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _accessKey="c" />
			<KolTextarea _label="With short key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _shortKey="s" />
		</div>
	</>
);
