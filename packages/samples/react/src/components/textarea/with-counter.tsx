import type { FC } from 'react';
import React from 'react';

import { KolTextarea, KolHeading } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TextareaWithCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates the <code>_maxLengthBehavior</code>-property of KolTextarea. When set to &quot;soft&quot;, it shows how many characters you
				have left without preventing input.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolHeading _label="_maxLengthBehavior set to 'soft'" _level={2}></KolHeading>
			<KolTextarea _label="Textarea with soft max length" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} _maxLengthBehavior="soft" />

			<KolHeading _label="_maxLengthBehavior set to 'hard'" _level={2} className="block mt-4"></KolHeading>
			<KolTextarea _label="Textarea with hard max length" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} />

			<KolHeading _label="_maxLengthBehavior set to 'hard' and '_hasCounter=true'" _level={2} className="block mt-4"></KolHeading>
			<KolTextarea _label="Textarea with hard max length" _value={'Lorem Ipsum'} className="mt-2" _maxLength={20} _hasCounter />

			<KolHeading _label="No limits and '_hasCounter=true'" _level={2} className="block mt-4"></KolHeading>
			<KolTextarea _label="Textarea with counter" _value={'Lorem Ipsum'} className="mt-2" _hasCounter />
		</section>
	</>
);
