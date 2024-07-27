import React, { FC } from 'react';
import { KolQuote } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const QuoteBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolQuote renders a quote with optional citation. This sample shows a quote in the variant &quot;inline&quot; with a link for citation.</p>
		</SampleDescription>
		<KolQuote _href="https://datatracker.ietf.org/doc/html/rfc1149" _quote="Avian carriers can provide high delay." _variant="inline"></KolQuote>
	</>
);
