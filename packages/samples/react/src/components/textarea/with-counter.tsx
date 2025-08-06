import type { FC } from 'react';
import React from 'react';

import { KolTextarea } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TextareaWithCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				The sample demonstrates various <code>KolTextarea</code> configurations — contrasting soft vs. hard <code>_maxLength</code> settings and the optional
				<code>_hasCounter</code> — including one instance without length limits.
			</p>
		</SampleDescription>

		<section className="w-full flex flex-col gap-4">
			<KolTextarea _label="Textarea with soft max length" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} _hasCounter _maxLengthBehavior="soft" />
			<KolTextarea _label="Textarea with max length" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} />
			<KolTextarea _label="Textarea with max length and counter" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} _hasCounter />
			<KolTextarea _label="Textarea with counter" _value={'Lorem Ipsum'} className="mt-2" _hasCounter />
		</section>
	</>
);
