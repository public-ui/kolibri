import React, { FC } from 'react';
import { KolLogo } from '@public-ui/react';
import { Bundesministerium } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';

export const LogoBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Logo der Bundesregierung.</p>
		</SampleDescription>
		<KolLogo className="w-50%" _org={Bundesministerium['Die Bundesregierung']} />
	</>
);
