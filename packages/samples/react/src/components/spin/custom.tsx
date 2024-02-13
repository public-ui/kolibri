import './custom.css';

import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';

export const SpinCustom: FC = () => (
	<KolSpin _show _variant="none">
		<span slot="expert" className="loader"></span>
	</KolSpin>
);
