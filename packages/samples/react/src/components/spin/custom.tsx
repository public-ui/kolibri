import { SampleDescription } from '../SampleDescription';
import './custom.css';

import React from 'react';

import { KolSpin } from '@public-ui/react-v19';

import type { FC } from 'react';

export const SpinCustom: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows a custom loading animation. Using the expert slot, it is possible to insert custom animations. Custom animations are not necessarily
				barrier-free.
			</p>
		</SampleDescription>

		<KolSpin _show _variant="none" data-visual-block="custom">
			<span slot="expert" className="loader"></span>
		</KolSpin>
	</>
);
