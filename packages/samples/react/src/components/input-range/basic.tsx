import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputRangeVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputRangeBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier verstehe ich Fehlermeldung bei Standard nicht. Hier ist ein Schieberegler mit Schalter am Rand. Der Wert kann von 0 bis 50 verändert werden.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputRangeVariants} />
	</>
);
