import { Component, h, Prop } from '@stencil/core';
import KolIconFc from '../../functional-components/Icon';
import { KolIconTag } from '../../core/component-names';

@Component({
	tag: 'kol-icon-benchmark',
	styleUrls: { default: './style.scss' },
	shadow: true,
})
export class KolIconBenchmark {
	/**
	 * Number of icons to render
	 */
	@Prop() public count = 100;

	/**
	 * Use web component (<kol-icon>) or functional component
	 */
	@Prop() public mode: 'wc' | 'fc' = 'wc';

	public render() {
		const icons = Array.from({ length: this.count }, () =>
			this.mode === 'wc' ? <KolIconTag _icons="codicon codicon-home" _label="" /> : <KolIconFc icons="codicon codicon-home" label="" />,
		);

		return <div class="kol-icon-benchmark__container">{icons}</div>;
	}
}
