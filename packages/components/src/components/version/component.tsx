import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { VersionApi } from '../../internal/functional-components/version/api';
import { versionPropsConfig } from '../../internal/functional-components/version/api';
import { VersionFC } from '../../internal/functional-components/version/component';
import { labelProp } from '../../internal/props';
import type { KoliBriIconsProp, LabelPropType, VersionProps } from '../../schema';

/**
 * Fixed background color of the version badge; matches the value the legacy component
 * hard-coded on `kol-badge`. The badge web component normalizes it itself.
 */
const VERSION_COLOR = '#bec5c9';

/**
 * The version icon carries a translated accessible label ("Versionsnummer" / "Version number")
 * so screen readers announce the icon's meaning alongside the version text.
 */
const VERSION_ICON = { left: { icon: 'kolicon-version', label: translate('kol-version') } } as const satisfies KoliBriIconsProp;

/**
 * The **Version** component renders the application version as a badge with a leading version icon.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-version',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolVersion extends BaseWebComponent<VersionApi> implements VersionProps, WebComponentInterface<VersionApi> {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(versionPropsConfig);
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<VersionFC color={VERSION_COLOR} icons={VERSION_ICON} label={this.getRenderProp('label')} />
			</Host>
		);
	}
}
