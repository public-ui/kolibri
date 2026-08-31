import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { HeadingApi } from '../../internal/functional-components/heading/api';
import { headingPropsConfig } from '../../internal/functional-components/heading/api';
import { HeadingFC } from '../../internal/functional-components/heading/component';
import { labelWithExpertSlotProp, levelProp, secondaryHeadlineProp } from '../../internal/props';
import type { HeadingLevel, LabelWithExpertSlotPropType } from '../../schema';

/**
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolHeading extends BaseWebComponent<HeadingApi> implements WebComponentInterface<HeadingApi> {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	/**
	 * Defines the text of the secondary headline.
	 */
	@Prop() public _secondaryHeadline?: string;

	@Watch('_secondaryHeadline')
	public watchSecondaryHeadline(value?: string): void {
		secondaryHeadlineProp.apply(value, (v) => this.setRenderProp('secondaryHeadline', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(headingPropsConfig);

		labelWithExpertSlotProp.apply(this._label, (v) => this.setRenderProp('label', v));
		levelProp.apply(this._level, (v) => this.setRenderProp('level', v));
		secondaryHeadlineProp.apply(this._secondaryHeadline, (v) => this.setRenderProp('secondaryHeadline', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<HeadingFC label={this.getRenderProp('label')} level={this.getRenderProp('level')} secondaryHeadline={this.getRenderProp('secondaryHeadline')} />
			</Host>
		);
	}
}
