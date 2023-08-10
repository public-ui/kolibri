import { Component, h, Host, JSX, State } from '@stencil/core';

import { API, States } from './types';

@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements API {
	public render(): JSX.Element {
		return (
			<Host>
				<nav aria-label="YYY">
					<ul class="treeview-navigation" role="tree" aria-label="YYY">
						<slot />
						{/*<li role="none">*/}
						{/*	<a role="treeitem" href="#XXX" aria-current="page">*/}
						{/*		XXX*/}
						{/*	</a>*/}
						{/*</li>*/}

						{/*<li role="none">*/}
						{/*	<a role="treeitem" aria-expanded="false" aria-owns="id-about-subtree" href="#about">*/}
						{/*		/!* icon *!/*/}
						{/*		About*/}
						{/*	</a>*/}
						{/*	<ul id="id-about-subtree" role="group" aria-label="About">*/}
						{/*		<li role="none">*/}
						{/*			<a role="treeitem" href="#overview">*/}
						{/*				<span class="label">Overview</span>*/}
						{/*			</a>*/}
						{/*		</li>*/}
						{/*	</ul>*/}
						{/*</li>*/}
					</ul>
				</nav>
			</Host>
		);
	}

	@State() public state: States = {};

	public componentWillLoad(): void {}
}
