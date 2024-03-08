import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputFileVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const InputFileBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier können einzelne oder mehrere Files ausgewählt werden. Bei &apos;Datei hochladen&apos; wird der Name der ausgewählten Datei angezeigt. Bei
				&apos;Datei hochladen (Multiple)&apos; werden die Anzahl der ausgewählten Dateien angezeigt.
			</p>
		</SampleDescription>
		<FormWrap RefComponent={InputFileVariants} />
	</>
);
