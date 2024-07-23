import './custom.css';
import { SampleDescription } from '../SampleDescription';

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

		<KolSpin _show _variant="none">
			<span slot="expert" className="loader"></span>
		</KolSpin>
	</>
);
