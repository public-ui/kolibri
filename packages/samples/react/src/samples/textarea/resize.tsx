import React from 'react';
import { KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaResize: FC = () => (
	<div className="grid gap-4">
		<KolTextarea _id="text-both" _resize="both">
			Texteingabe (both)
		</KolTextarea>
		<KolTextarea _id="text-verical" _resize="vertical">
			Texteingabe (vertical)
		</KolTextarea>
		<KolTextarea _id="text-horizontal" _resize="horizontal">
			Texteingabe (horizontal)
		</KolTextarea>
		<KolTextarea _id="text-none" _resize="none">
			Texteingabe (none)
		</KolTextarea>
	</div>
);
