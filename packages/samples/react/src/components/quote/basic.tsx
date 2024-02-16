import type { FC } from 'react';
import React from 'react';

import { KolQuote } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const QuoteBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist ein Beispiel für ein Zitat.</p>
		</SampleDescription>
		<KolQuote _href="https://datatracker.ietf.org/doc/html/rfc1149" _quote="Avian carriers can provide high delay." _variant="inline"></KolQuote>
	</>
);
