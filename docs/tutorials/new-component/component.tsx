// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml

import type { JSX } from '@stencil/core';
import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

import type { HeadingLevel } from '@public-ui/schema';
import { nonce } from '../../utils/dev.utils';
import { setState, watchBoolean, watchString } from '@public-ui/schema';
import { watchHeadingLevel } from '../heading/validation';
import type { KoliBriNewComponentCallbacks, NewComponentAPI, NewComponentStates } from './types';

/**
 * @class NewComponent - Ermöglicht das Stylen des äußeren Container des NewComponents.
 * @class open - Ermöglicht das Stylen des geöffneten Zustands und Icons.
 * @class close - Ermöglicht das Stylen des geschlossenen Zustands und Icons.
 * @class icon - Ermöglicht das Stylen der Icons.
 * @class header - Ermöglicht das Stylen des Kopfbereichs.
 * @class content - Ermöglicht das Stylen des Inhaltsbereichs.
 *
 * @slot content - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des NewComponents.
 * 	(wenn nur ein slot verwendet wird, kann der Name weggelassen werden)
 */
@Component({
	tag: 'kol-new-component',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolNewComponent implements NewComponentAPI {
	private readonly nonce = nonce();

	public render(): JSX.Element {
		return (
			<Host>
				<div
					class={{
						'new-component': true,
						open: !!this.state._open,
						close: !this.state._open,
					}}
				>
					<kol-button _label="Toggle" _on={{ onClick: this.toggle }}></kol-button>
					<kol-heading-wc _label={this.state._heading} _level={this.state._level}></kol-heading-wc>
					<div
						aria-hidden={this.state._open ? undefined : 'true'}
						class="content"
						id={this.nonce}
						hidden={!this.state._open}
						style={
							this.state._open
								? undefined
								: {
										display: 'none',
										height: '0',
										visibility: 'hidden',
								  }
						}
					>
						<slot name="content" />
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Gibt die Überschrift des NewComponents an.
	 */
	@Prop() public _heading!: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Funktionen an.
	 */
	@Prop() public _on?: KoliBriNewComponentCallbacks;

	/**
	 * Gibt an, ob das NewComponent geöffnet ist.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: NewComponentStates = {
		_heading: '…', // ⚠ required
		_level: 1,
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_heading')
	public validateHeading(value?: string): void {
		watchString(this, '_heading', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriNewComponentCallbacks): void {
		if (typeof value?.onClick === 'function') {
			setState(this, '_on', value);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_open')
	public validateOpen(value?: boolean): void {
		watchBoolean(this, '_open', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateHeading(this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}
	private toggle = (event: Event) => {
		this._open = !this._open;

		/**
		 * Der Timeout wird benötigt, damit das Event
		 * vom Button- auf das NewComponent-Event wechselt.
		 * So ist es dem Anwendenden möglich das _open-
		 * Attribute abzufragen.
		 */
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			if (typeof this.state._on?.onClick === 'function') {
				this.state._on.onClick(event, !!this._open);
			}
		});
	};
}
