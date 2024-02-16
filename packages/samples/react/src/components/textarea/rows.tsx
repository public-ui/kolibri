import React from 'react';

import { KolForm, KolTextarea } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const TextareaRows: FC = () => (
	<>
		<SampleDescription>
			<p>Hier verstehe ich es nicht. Die Rows sind nicht wie erwartet limitiert.</p>
		</SampleDescription>
		<KolForm>
			<KolTextarea _rows={10} _label="Texteingabe" />
		</KolForm>
	</>
);
