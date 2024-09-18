import React from 'react';

import { KolAbbr } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const AbbrBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolAbbr shows the full expansion of an abbreviated term on mouse over. The sample illustrates the different possible alignments for the tooltip.</p>
		</SampleDescription>

		<section className="text-base">
			<p>
				I am <KolAbbr _label="zum Beispiel">e.g.</KolAbbr> an abbreviation.
			</p>
			<p>
				I am&nbsp;
				<KolAbbr _label="zum Beispiel" _tooltipAlign="right">
					e.g.
				</KolAbbr>
				&nbsp;an abbreviation (right).
			</p>
			<p>
				I am&nbsp;
				<KolAbbr _label="zum Beispiel" _tooltipAlign="bottom">
					e.g.
				</KolAbbr>
				&nbsp;an abbreviation (below).
			</p>
			<p>
				I am&nbsp;
				<KolAbbr _label="zum Beispiel" _tooltipAlign="left">
					e.g.
				</KolAbbr>
				&nbsp;an abbreviation (left).
			</p>
			<p>
				I am&nbsp;
				<KolAbbr _label="zum Beispiel" _tooltipAlign="top">
					e.g.
				</KolAbbr>
				&nbsp;an abbreviation (top).
			</p>
		</section>
	</>
);
