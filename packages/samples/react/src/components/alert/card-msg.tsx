import React from 'react';

import { AlertBasic } from './basic';

import type { FC } from 'react';

export const AlertCardMsg: FC = () => (
	<div className="grid">
		<AlertBasic variant="card" />
	</div>
);
