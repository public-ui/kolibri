import type { FC } from 'react';
import React from 'react';

import { AlertVariants } from './basic';
import { SampleDescription } from '../SampleDescription';

export const AlertCardMsg: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAlert can show messages of different types. This sample illustrates the variant <code>card</code>, showing all possible types with and without
				headlines and close buttons.
			</p>
		</SampleDescription>

		<AlertVariants variant="card" />
	</>
);
