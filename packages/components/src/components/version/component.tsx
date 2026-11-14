import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../internals/src/controller/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../../internals/src/controller/generic-types';
import type { VersionApi } from '../../../internals/src/controller/version/api';
import { versionPropsConfig } from '../../../internals/src/controller/version/api';
import { translate } from '../../../internals/src/i18n';
import { labelProp } from '../../../internals/src/props/index';
import type { ColorPair, KoliBriIconsProp, LabelPropType, VersionProps } from '../../../internals/src/schema/index';
import { createContrastColorPair } from '../../../internals/src/schema/index';
import { VersionFC } from '../../internal/functional-components/version/component';

/**
 * Fixed background color of the version badge, paired with the contrast-safe foreground the badge
 * web component would derive from the same hex value.
 */
const VERSION_COLORS = createContrastColorPair('#bec5c9');
const VERSION_COLOR = { backgroundColor: VERSION_COLORS.background, foregroundColor: VERSION_COLORS.foreground } as const satisfies ColorPair;

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
	protected readonly propsConfig: PropsConfigShape = versionPropsConfig;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	public componentWillLoad(): void {
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<VersionFC color={VERSION_COLOR} icons={VERSION_ICON} label={this.getRenderProp('label')} />
			</Host>
		);
	}
}
