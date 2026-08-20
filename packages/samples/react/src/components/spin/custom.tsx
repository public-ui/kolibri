import { SampleBlock } from '../SampleBlock';
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

		<SampleBlock id="custom">
			<KolSpin _show _variant="none">
				<span slot="expert" className="loader"></span>
			</KolSpin>
		</SampleBlock>
	</>
);
