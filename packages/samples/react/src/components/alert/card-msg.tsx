import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';
import { AlertVariants } from './basic';

export const AlertCardMsg: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAlert shows messages of different types. This sample illustrates the variant <code>card</code>, showing all possible types with and without headlines
				and close buttons.
			</p>
		</SampleDescription>

		<section className="w-full">
			<AlertVariants variant="card" />
		</section>
	</>
);
