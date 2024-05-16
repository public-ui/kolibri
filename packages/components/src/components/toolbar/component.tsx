import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, ToolbarAPI, ToolbarStates, ToolbarItemsPropType, ToolbarItemPropType } from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KolLinkTag, KolButtonTag } from '../../core/component-names';

const TOOLBAR_ITEM_TAG_NAME = 'kol-toolbar-item';

const Elements = (props: { elements: ToolbarItemsPropType }): JSX.Element => {
	const mappedElements: JSX.Element[] = [];
	if (typeof props.elements === 'string') {
		return mappedElements;
	}
	props.elements.map((element: ToolbarItemPropType, index: number) => {
		mappedElements.push(
			(
				<div key={index} class={`${TOOLBAR_ITEM_TAG_NAME}`}>
					{'_href' in element ? <KolLinkTag {...element}></KolLinkTag> : <KolButtonTag {...element}></KolButtonTag>}
				</div>
			) as JSX.Element,
		);
	});
	return mappedElements;
};

@Component({
	tag: 'kol-toolbar',
	styleUrl: './style.scss',
	shadow: false,
})
export class KolToolbar implements ToolbarAPI {
	@Element() host!: HTMLElement;

	@State() public state: ToolbarStates = {
		_label: '',
		_items: [],
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-toolbar">
				<div class="toolbar" role="toolbar" aria-label={this._label}>
					<Elements elements={this.state._items} />
				</div>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the elements of toolbar to render.
	 */
	@Prop() public _items!: ToolbarItemsPropType;

	// @Watch('_items')
	// public validateItems(value?: (LinkProps | ButtonProps)[]): void {

	// }

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_items')
	public validateItems(value?: ToolbarItemsPropType): void {
		validateToolbarItems(this, value);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
			event.preventDefault();
			const elements = Array.from(this.host.querySelectorAll(TOOLBAR_ITEM_TAG_NAME));
			const currentIndex = elements.indexOf(document.activeElement as HTMLElement);
			let nextIndex = -1;
			if (event.code === 'ArrowRight') {
				nextIndex = currentIndex >= 0 && currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
			} else if (event.code === 'ArrowLeft') {
				nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
			}
			if (nextIndex !== -1 && elements[nextIndex]) {
				elements.forEach((el) => el.classList.remove('focused'));
				const nextElement = elements[nextIndex] as HTMLElement;
				nextElement.classList.add('focused');
				nextElement.focus();
			}
		}
	}
}
