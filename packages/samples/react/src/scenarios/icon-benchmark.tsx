import React from 'react';
import type { FC } from 'react';
import { KolIcon } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

const ICON_COUNT = 200;

export const IconBenchmark: FC = () => {
	const icons = Array.from({ length: ICON_COUNT }, (_, i) => <KolIcon _icons="codicon codicon-home" _label="" key={i} />);

	return (
		<>
			<SampleDescription>
				<p>
					This scenario renders many KoliBri icons to compare the
					<code>kol-icon</code> component with a custom web component using the
					<code>KolIconFc</code> functional component.
				</p>
			</SampleDescription>

			<h3>Using kol-icon</h3>
			<div className="flex flex-wrap gap-2">{icons}</div>

			<h3>Using kol-icon-fc in a web component</h3>
			<kol-icon-benchmark count={ICON_COUNT} mode="fc"></kol-icon-benchmark>
		</>
	);
};
