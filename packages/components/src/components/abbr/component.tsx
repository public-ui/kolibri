import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import type { AbbrApi } from '../../../internals/src/controller/abbr/api';
import { abbrPropsConfig } from '../../../internals/src/controller/abbr/api';
import { BaseWebComponent } from '../../../internals/src/controller/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../../internals/src/controller/generic-types';
import { labelLangSegmentsProp } from '../../../internals/src/props/index';
import type { LabelLangSegmentsPropType } from '../../../internals/src/schema/index';
import { AbbrFC } from '../../internal/functional-components/abbr/component';

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
	protected readonly propsConfig: PropsConfigShape = abbrPropsConfig;

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
