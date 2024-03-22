import './custom.css';
import { SampleDescription } from '../SampleDescription';

import React from 'react';

import { KolSpin } from '@public-ui/react';

import type { FC } from 'react';

export const SpinCustom: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier ist ein Beispiel für eine Custom Animation. Mittels des Expert-Slots ist es möglich, eigene Animationen einzufügen. Diese kann nach eigenen
				Vorstellungen angepasst werden und ist nicht zwingend barrierefrei.
			</p>
		</SampleDescription>
		<KolSpin _show _variant="none">
			<span slot="expert" className="loader"></span>
		</KolSpin>
	</>
);
