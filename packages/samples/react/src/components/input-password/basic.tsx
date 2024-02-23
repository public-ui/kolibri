import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputPasswordVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputPasswordBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind Passwort Eingabefelder dargestellt. Im Feld &apos;Passwort P&apos; eingegebene Zeichen werden verdeckt angezeigt.</p>
		</SampleDescription>
		<FormWrap RefComponent={InputPasswordVariants} />
	</>
);
