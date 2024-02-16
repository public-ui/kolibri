import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEmailVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputEmailBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier verstehe ich es nicht. (Fehlermeldung bei Standard.) </p>
		</SampleDescription>
		<FormWrap RefComponent={InputEmailVariants} />
	</>
);
