import './custom.css';
import { SampleDescription } from '../SampleDescription';
import { SampleColumns } from '../SampleColumns';

import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';

export const SpinCustom: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows a custom loading animation. Using the expert slot, it is possible to insert custom animations. Custom animations are not necessarily
				barrier-free.
			</p>
		</SampleDescription>

		<SampleColumns>
			<fieldset>
				<legend>KolSpin &quot;Custom&quot; (show Label)</legend>
				<KolSpin _show _variant="none" _label="In Progress...">
					<span slot="expert" className="loader"></span>
				</KolSpin>
			</fieldset>
			<fieldset>
				<legend>KolSpin &quot;Custom&quot; (hide Lable)</legend>
				<KolSpin _show _variant="none">
					<span slot="expert" className="loader"></span>
				</KolSpin>
			</fieldset>
		</SampleColumns>
	</>
);
