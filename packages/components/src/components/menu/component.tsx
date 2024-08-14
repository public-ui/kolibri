/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, Component, Host, Prop, State, Watch, type JSX } from '@stencil/core';
import type { MenuAPI, MenuItemProps, MenuStates, Stringified } from '../../schema';

enum KeyMap {
	ArrowDown = 'ArrowDown',
	ArrowUp = 'ArrowUp',
	Enter = 'Enter',
	Spacebar = '',
}

@Component({
	tag: 'kol-menu-wc',
	styleUrl: './style.scss',
	shadow: false,
})
export class KolMenu implements MenuAPI {
	private readonly renderMenuItem = (item: MenuItemProps, index: number): JSX.Element => {
		// ref={(el) => (this.listItems[index] = el!)}
		// tabindex={this.state._pageSize === option.value ? '0' : '-1'}
		// key={option.value}

		return (
			<li role="menuitem" onClick={(event) => this.fireOnChange(event, item)} onKeyDown={(event) => this.handleKeyDown(event, index, item)}>
				{item._label}
			</li>
		);
	};

	private handleKeyDown(event: KeyboardEvent, index: number, item: unknown): void {
		console.log('INDEX: ', index);
		switch (event.key as KeyMap) {
			case KeyMap.ArrowDown:
				this.selectNextMenuItem();
				event.preventDefault();
				break;
			case KeyMap.ArrowUp:
				this.selectPrevMenuItem();
				event.preventDefault();
				break;
			case KeyMap.Enter:
			case KeyMap.Spacebar:
				this.fireOnChange(event, item);
				event.preventDefault();
				break;
			default:
				break;
		}
	}

	private selectNextMenuItem() {
		// const nextIndex = index + 1 < this.listItems.length ? index + 1 : 0;
		//	this.listItems[nextIndex].focus();
	}

	private selectPrevMenuItem() {
		// const prevIndex = index - 1 >= 0 ? index - 1 : this.listItems.length - 1;
		// this.listItems[prevIndex].focus();
	}

	private fireOnChange(event: unknown, item: unknown) {
		console.log('fireOnChange', { event, item });
		// this.onChangePageSize(event, value);
	}

	public render(): JSX.Element {
		console.log('RENDER: ', this._menuItems, this.state._menuItems);

		return (
			<Host class="kol-menu-wc">
				<ul class="menu">{(this._menuItems as any[])?.map(this.renderMenuItem) || <div></div>}</ul>
			</Host>
		);
	}

	/**
	 *
	 */
	@Prop() public _menuItems: Stringified<MenuItemProps[]> = [];

	@State() public state: MenuStates = {
		_menuItems: [],
	};

	@Watch('_menuItems')
	public validateMenuItems(value?: Stringified<MenuItemProps[]>): void {
		console.log('value: ', value);
		// watchNavLinks('KolBreadcrumb', this, value);
	}

	public componentWillLoad(): void {
		console.log('componentWillLoad');
		this.validateMenuItems(this._menuItems);
	}
}

/**
 <ul class="dropdown-menu">
							{this.state._pageSizeOptions.map((option, index) => (
								<li
									ref={(el) => (this.listItems[index] = el!)}
									key={option.value}
									role="menuitem"
									tabindex={this.state._pageSize === option.value ? '0' : '-1'}
									aria-selected={this.state._pageSize === option.value ? 'true' : 'false'}
									onClick={(event) => {
										this.onChangePageSize(event, option.value);
									}}
									onKeyDown={(event) => this.handleKeyDown(event, index, option.value)}
								>
									{option.label} {this.state._pageSize === option.value && <span> </span>}
								</li>
							))}
						</ul>
 */

/**
private handleKeyDown(event: KeyboardEvent, index: number, value: unknown): void {
		if (event.key === 'ArrowDown') {
			const nextIndex = index + 1 < this.listItems.length ? index + 1 : 0;
			this.listItems[nextIndex].focus();
			event.preventDefault();
		} else if (event.key === 'ArrowUp') {
			const prevIndex = index - 1 >= 0 ? index - 1 : this.listItems.length - 1;
			this.listItems[prevIndex].focus();
			event.preventDefault();
		} else if (event.key === 'Enter' || event.key === ' ') {
			this.onChangePageSize(event, value);
			event.preventDefault();
		}
	} 
*/
