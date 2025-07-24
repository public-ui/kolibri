import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';

export const TextareaHideLabel: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates KolTextarea with hidden labels.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<div className="black-background">
				<KolTextarea _hideLabel _placeholder="Placeholder" _label="Text" />
			</div>
			<KolTextarea _hideLabel _placeholder="Placeholder" _required _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Text" _touched _hint={HINT_MSG} />
			<KolTextarea _hideLabel _placeholder="Placeholder" _label="Text" _msg={{ _type: 'info', _description: 'Just a hint' }} />
			<KolTextarea _hideLabel _placeholder="Placeholder" _label="Text" _msg={{ _type: 'warning', _description: 'Small warning' }} />
			<KolTextarea _hideLabel _placeholder="Placeholder" _label="Text" _msg={{ _type: 'success', _description: 'Success message' }} />
			<KolTextarea _hideLabel _accessKey="T" _label="Text (3 rows)" _rows={3} />
			<KolTextarea _hideLabel _label="Text (placeholder)" _rows={3} _placeholder="Placeholder" />
			<KolTextarea _hideLabel _label="Text (disabled & placeholder)" _rows={3} _placeholder="Placeholder" _disabled />
			<KolTextarea _hideLabel _label="Text (readonly)" _rows={3} _placeholder="Placeholder" _readOnly />
			<KolTextarea _hideLabel _label="Text (disabled & value)" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _disabled />
			<KolTextarea _hideLabel _label="With access key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _accessKey="c" />
			<KolTextarea _hideLabel _label="With short key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _shortKey="s" />
		</div>
	</>
);
