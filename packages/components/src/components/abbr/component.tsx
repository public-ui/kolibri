import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { abbrPropsConfig } from '../../internal/functional-components/abbr/api';
import { AbbrFC } from '../../internal/functional-components/abbr/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { labelLangSegmentsProp } from '../../internal/props';
import type { LabelLangSegmentsPropType } from '../../schema';

/**
 * The **Abbr** component implements the HTML tag `abbr`.
 *
 * @slot - The abbreviation (short form).
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr extends BaseWebComponent<AbbrApi> implements WebComponentInterface<AbbrApi> {
	/**
	 * DEPRECATED!
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelLangSegmentsPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		labelLangSegmentsProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	public componentWillLoad(): void {
		this.initRenderProps(abbrPropsConfig);
		this.watchLabel(this._label);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<AbbrFC label={this.getRenderProp('label')} />
			</Host>
		);
	}
}
