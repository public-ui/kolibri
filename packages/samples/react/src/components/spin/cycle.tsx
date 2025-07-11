import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { SampleColumns } from '../SampleColumns';

export const SpinCycle: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows the KolSpin variant &quot;cycle&quot;.</p>
		</SampleDescription>

		<SampleColumns>
			<fieldset>
				<legend>KolSpin &quot;Cycle&quot; (show Label)</legend>
				<KolSpin _show _variant="cycle" _label="In Progress..." />
			</fieldset>
			<fieldset>
				<legend>KolSpin &quot;Cycle&quot; (hide Lable)</legend>
				<KolSpin _show _variant="cycle" />
			</fieldset>
		</SampleColumns>
	</>
);
