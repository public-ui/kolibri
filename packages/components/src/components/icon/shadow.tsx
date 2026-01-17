import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { IconAPI, IconStates, LabelPropType } from '../../schema';
import { IconController } from './controller';

import type { JSX } from '@stencil/core';
import KolIconFc from '../../functional-components/Icon';
import { BEM_CLASS_ICON } from './bem';

/**
 * @part icon - Ermöglicht das Styling des inneren Icons.
 */
@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolIcon implements IconAPI {
	private readonly controller: IconController;
	public render(): JSX.Element {
		return (
			<Host exportparts="icon" class={BEM_CLASS_ICON}>
				<KolIconFc icons={this.state._icons} label={this.state._label} />
			</Host>
		);
	}

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons!: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: IconStates = {
		_icons: 'kolicon-logo',
		_label: '', // ⚠ required
	};

	public constructor() {
		this.controller = new IconController(this);
	}

	@Watch('_icons')
	public validateIcons(value?: string): void {
		this.controller.validateIcons(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		this.controller.validateLabel(value);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad();
	}
}
