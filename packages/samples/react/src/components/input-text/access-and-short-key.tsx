import * as React from 'react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolInputText } from '@public-ui/react';

export const AccessAndShortKey: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputText renders a text input field. The sample shows KolInputText in a form context with all variations and states.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputText _label="With access key" _type="text" _accessKey="c"></KolInputText>
			<KolInputText _hideLabel _label="With access key and tooltip" _type="text" _accessKey="c"></KolInputText>
			<KolInputText _label="With short key" _type="text" _shortKey="s"></KolInputText>
			<KolInputText _hideLabel _label="With short key and tooltip" _type="text" _shortKey="s"></KolInputText>
		</div>
	</>
);
