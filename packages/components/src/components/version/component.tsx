import type { LabelPropType, VersionAPI, VersionStates } from '@public-ui/schema';
import { validateLabel } from '@public-ui/schema';
import { Component, h, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';

import type { JSX } from '@stencil/core';
import { KolBadgeTag } from '../../core/component-names';

@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolVersion implements VersionAPI {
	public render(): JSX.Element {
		return (
			<KolBadgeTag
				_color="#bec5c9"
				_icons={{
					left: { icon: 'codicon codicon-versions', label: translate('kol-version') },
				}}
				_label={this.state._label}
			/>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: VersionStates = {
		_label: '0.0.0-alpha.0',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
	}
}
