import React, { FC } from 'react';
import { KolBadge, KolLogo } from '@public-ui/react';
import { Bundesministerium } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';

export const LogoBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolLogo renders the logo for supported organizations.</p>
			<p>
				<KolBadge _label="The component is deprecated and won't be available anymore in KoliBri version 3." _color="#db5461" />
			</p>
		</SampleDescription>
		<KolLogo className="w-50%" _org={Bundesministerium['Die Bundesregierung']} />
	</>
);
