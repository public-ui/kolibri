import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { HeadingApi } from '../../internal/functional-components/heading/api';
import { HeadingFC } from '../../internal/functional-components/heading/component';
import { HeadingController } from '../../internal/functional-components/heading/controller';
import type { HeadingLevel, LabelWithExpertSlotPropType } from '../../schema';

/**
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolHeading implements WebComponentInterface<HeadingApi> {
	private readonly ctrl = new HeadingController(BaseWebComponent.stateLess);

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		this.ctrl.watchLevel(value);
	}

	/**
	 * Defines the text of the secondary headline.
	 */
	@Prop() public _secondaryHeadline?: string;

	@Watch('_secondaryHeadline')
	public watchSecondaryHeadline(value?: string): void {
		this.ctrl.watchSecondaryHeadline(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
			level: this._level,
			secondaryHeadline: this._secondaryHeadline,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<HeadingFC
					label={this.ctrl.getRenderProp('label')}
					level={this.ctrl.getRenderProp('level')}
					secondaryHeadline={this.ctrl.getRenderProp('secondaryHeadline')}
				/>
			</Host>
		);
	}
}
