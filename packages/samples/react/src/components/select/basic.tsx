import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SelectVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const SelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier sind Beispiele für verschiedene Auswahlfelder. Es gibt die Varianten Dropdownmenü und Liste mit Scrollbar. Es kann nur ein Element gleichzeitig
				ausgewählt werden.
			</p>
		</SampleDescription>
		<FormWrap RefComponent={SelectVariants} />
	</>
);
