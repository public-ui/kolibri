import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputRadioVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputRadioBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind Radio-Buttons in verschiedenen Ausführungen angezeigt. Es kann immer nur einer der drei Radio-Buttons gleichzeitig angeklickt werden.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputRadioVariants} />
	</>
);
