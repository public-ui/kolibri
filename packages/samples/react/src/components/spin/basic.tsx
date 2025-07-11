import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { SampleColumns } from '../SampleColumns';

export const SpinBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSpin renders a loading indicator. This sample shows the default variant &quot;dot&quot;.</p>
		</SampleDescription>

		<SampleColumns>
			<fieldset>
				<legend>KolSpin &quot;Basic&quot; (show Label)</legend>
				<KolSpin _show _label="In Progress..." />
			</fieldset>
			<fieldset>
				<legend>KolSpin &quot;Basic&quot; (hide Label)</legend>
				<KolSpin _show />
			</fieldset>
		</SampleColumns>
	</>
);
