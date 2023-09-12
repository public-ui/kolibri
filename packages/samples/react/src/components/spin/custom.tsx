import React from 'react';
import { KolSpin } from '@public-ui/react';
import './custom.css';

import { FC } from 'react';

export const SpinCustom: FC = () => (
	<KolSpin _show _variant="none">
		<span slot="expert" className="loader"></span>
	</KolSpin>
);
