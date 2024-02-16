import type { FC } from 'react';
import React from 'react';

import { FocusElement } from '../FocusInput';
import { ButtonVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const ButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier sind anklickbare und nicht anklickbare Buttons. Der Unterschied zwischen Zeile eins und drei ist, dass in Zeile drei ein Label nach anklicken und
				als Tooltip erscheint. Es soll immer nur ein Button gleichzeitig angeklickt sein.
			</p>
		</SampleDescription>
		<FocusElement RefComponent={ButtonVariants} />
	</>
);
