import { KolInputCheckbox, KolInputNumber, KolInputText } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';

const MAX_LENGTH = 333;
const NUMBER_OF_INPUTS = new Array(MAX_LENGTH).fill(0).map((_, i) => i + 1);

export const PerformanceTest: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This example renders many KoliBri components to show the performance.</p>
			</SampleDescription>

			<div className="w-full grid gap-4">
				{NUMBER_OF_INPUTS.map((idx) => (
					<div className="flex flex-wrap items-end gap-4" key={idx}>
						<KolInputText _label={`TextInput #${idx}`} />
						<KolInputNumber _label={`NumberInput #${idx}`} />
						<KolInputCheckbox _label={`Checkbox #${idx}`} />
					</div>
				))}
			</div>
		</>
	);
};
