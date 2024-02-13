import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';

export const TextareaResize: FC = () => (
	<KolForm className="grid gap-4">
		<KolTextarea _resize="both" _label="Texteingabe (both)" />
		<KolTextarea _resize="vertical" _label="Texteingabe (vertical)" />
		<KolTextarea _resize="horizontal" _label="Texteingabe (horizontal)" />
		<KolTextarea _resize="none" _label="Texteingabe (none)" />
	</KolForm>
);
