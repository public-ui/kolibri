import './custom.css';
import { SampleDescription } from '../SampleDescription';

import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';

export const SpinCustom: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Beispiel für Custom Animation.</p>
		</SampleDescription>
		<KolSpin _show _variant="none">
			<span slot="expert" className="loader"></span>
		</KolSpin>
	</>
);
