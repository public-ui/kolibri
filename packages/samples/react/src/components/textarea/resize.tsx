import React from 'react';
import { KolForm, KolTextarea } from '@public-ui/react';

import { FC } from 'react';

export const TextareaResize: FC = () => (
	<KolForm className="grid gap-4">
		<KolTextarea _id="text-both" _resize="both" _label="Texteingabe (both)" />
		<KolTextarea _id="text-verical" _resize="vertical" _label="Texteingabe (vertical)" />
		<KolTextarea _id="text-horizontal" _resize="horizontal" _label="Texteingabe (horizontal)" />
		<KolTextarea _id="text-none" _resize="none" _label="Texteingabe (none)" />
	</KolForm>
);
