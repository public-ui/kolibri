import { Component, Element, h, Host, JSX, Listen, State } from '@stencil/core';

import { API, States } from './types';

@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements API {
	@Element() host!: HTMLElement;

	private observer?: MutationObserver;
	private treeItemElements?: Element[];

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

	private getTreeItemElements(): Element[] {
		const topLevel = (this.host.querySelector('slot')?.assignedNodes() as Element[]).filter((node) => node.tagName === 'KOL-TREE-ITEM');
		return topLevel.reduce((accumulator, currentValue) => {
			const children = currentValue.querySelectorAll('kol-tree-item'); //FIXME export as const somewhere

			return [...accumulator, currentValue, ...children];
		}, [] as Element[]);
	}

	public componentWillLoad(): void {
		this.treeItemElements = this.getTreeItemElements();
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			// console.log(event.composedPath(), document.activeElement && [...(event.composedPath() as Element[])].includes(document.activeElement));
			// console.log(this.host, document.activeElement, this.host.contains(document.activeElement));
			// if (this.host.contains(document.activeElement)) {
			// 	console.log(document.activeElement);
			// }

			// console.log(this.host, this.host.querySelector(':focus'));

			console.log(document.activeElement);
		}
	}
}
