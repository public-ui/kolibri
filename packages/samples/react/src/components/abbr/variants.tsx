import React from 'react';

import { KolAbbr } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const AbbrVariants: FC = () => (
	<>
		<SampleDescription>
			<p>
				All combinations of <code>_abbr</code>, <code>_label</code> and the deprecated default slot. <code>_abbr</code> takes precedence over the slot. Without{' '}
				<code>_abbr</code> the slot text is the fallback; markup in the slot is not rendered. Only a non-empty <code>_label</code> makes the abbreviation
				focusable and shows the tooltip.
			</p>
		</SampleDescription>

		<div className="grid gap-8">
			<SampleBlock id="abbr-only" heading="_abbr" fitContent>
				<span>
					I am <KolAbbr _abbr="e.g." /> an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="abbr-label" heading="_abbr + _label" fitContent>
				<span>
					I am <KolAbbr _abbr="e.g." _label="for example" /> an abbreviation with a long form.
				</span>
			</SampleBlock>

			<SampleBlock id="abbr-label-slot" heading="_abbr + _label + slot (_abbr wins)" fitContent>
				<span>
					I am <KolAbbr _abbr="e.g." _label="for example">slot text</KolAbbr> an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="abbr-slot" heading="_abbr + slot, no _label (_abbr wins)" fitContent>
				<span>
					I am <KolAbbr _abbr="e.g.">slot text</KolAbbr> an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="slot-only" heading="Slot only (deprecated)" fitContent>
				<span>
					I am <KolAbbr>e.g.</KolAbbr> an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="slot-label" heading="Slot + _label (deprecated)" fitContent>
				<span>
					I am <KolAbbr _label="for example">e.g.</KolAbbr> an abbreviation with a long form.
				</span>
			</SampleBlock>

			<SampleBlock id="slot-markup" heading="Slot with markup, no _label (markup not rendered)" fitContent>
				<span>
					I am{' '}
					<KolAbbr>
						<strong>e.g.</strong>
					</KolAbbr>{' '}
					an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="slot-markup-label" heading="Slot with markup + _label (markup not rendered)" fitContent>
				<span>
					I am{' '}
					<KolAbbr _label="for example">
						<strong>e.g.</strong>
					</KolAbbr>{' '}
					an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="label-only" heading="_label only (no abbreviation)" fitContent>
				<span>
					I am <KolAbbr _label="for example" /> an empty abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="empty" heading="Nothing set" fitContent>
				<span>
					I am <KolAbbr /> an empty abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="empty-strings" heading="Empty _abbr and _label + slot (slot is the fallback, no tooltip)" fitContent>
				<span>
					I am{' '}
					<KolAbbr _abbr="" _label="">
						e.g.
					</KolAbbr>{' '}
					an abbreviation.
				</span>
			</SampleBlock>

			<SampleBlock id="long-label" heading="Long _label" narrow>
				<p>
					I am <KolAbbr _abbr="CSS" _label="Cascading Style Sheets, the language that describes the presentation of a document written in HTML or XML" /> in a
					paragraph that wraps on narrow viewports.
				</p>
			</SampleBlock>
		</div>
	</>
);
