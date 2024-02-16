import type { FC } from 'react';
import React from 'react';

import { Bundesministerium } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';
import { KolLogo } from '@public-ui/react';

export const LogoBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Logo der Bundesregierung.</p>
		</SampleDescription>
		<KolLogo className="w-50%" _org={Bundesministerium['Die Bundesregierung']} />
	</>
);
