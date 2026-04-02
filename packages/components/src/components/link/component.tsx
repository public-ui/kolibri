import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import { LinkFC } from '../../internal/functional-components/link/component';
import { LinkController } from '../../internal/functional-components/link/controller';
import type {
	AlignPropType,
	AriaCurrentValuePropType,
	FocusableElement,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	Stringified,
} from '../../schema';

/**
 * The **Link** component renders an anchor element with accessible label, icon and tooltip support.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLink extends BaseWebComponent<LinkApi> implements WebComponentInterface<LinkApi>, FocusableElement {
	@Element() private readonly host?: HTMLElement;

	private readonly ctrl = new LinkController(this.stateAccess);

	/**
	 * Sets focus on the internal anchor element.
	 */
	@Method()
	public focus(): Promise<void> {
		return this.ctrl.focus();
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	public click(): Promise<void> {
		return this.ctrl.click();
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		this.ctrl.watchAccessKey(value);
	}

	/**
	 * Defines which elements are controlled by this component.
	 */
	@Prop() public _ariaControls?: string;

	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		this.ctrl.watchAriaControls(value);
	}

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: string): void {
		this.ctrl.watchAriaCurrentValue(value);
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: string;

	@Watch('_ariaDescription')
	public watchAriaDescription(value?: string): void {
		this.ctrl.watchAriaDescription(value);
	}

	/**
	 * Marks this element as open/expanded, or the connected element is open/expanded.
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;

	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.ctrl.watchAriaExpanded(value);
	}

	/**
	 * Defines the contextual relationship between a parent and its child elements.
	 */
	@Prop() public _ariaOwns?: string;

	@Watch('_ariaOwns')
	public watchAriaOwns(value?: string): void {
		this.ctrl.watchAriaOwns(value);
	}

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: string;

	@Watch('_customClass')
	public watchCustomClass(value?: string): void {
		this.ctrl.watchCustomClass(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.ctrl.watchDisabled(value);
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: string;

	@Watch('_download')
	public watchDownload(value?: string): void {
		this.ctrl.watchDownload(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.ctrl.watchHideLabel(value);
	}

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href!: string;

	@Watch('_href')
	public watchHref(value?: string): void {
		this.ctrl.watchHref(value);
	}

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	@Watch('_icons')
	public watchIcons(value?: KoliBriIconsProp): void {
		this.ctrl.watchIcons(value);
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline.
	 */
	@Prop() public _inline?: boolean = true;

	@Watch('_inline')
	public watchInline(value?: boolean): void {
		this.ctrl.watchInline(value);
	}

	/**
	 * Defines the visible or semantic label of the component.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.ctrl.watchLabel(typeof value === 'string' ? value : undefined);
	}

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;

	@Watch('_on')
	public watchOn(value?: LinkOnCallbacksPropType): void {
		this.ctrl.watchOn(value);
	}

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: string;

	@Watch('_role')
	public watchRole(value?: string): void {
		this.ctrl.watchRole(value);
	}

	/**
	 * Adds a visual shortcut hint after the label.
	 */
	@Prop() public _shortKey?: string;

	@Watch('_shortKey')
	public watchShortKey(value?: string): void {
		this.ctrl.watchShortKey(value);
	}

	/**
	 * Defines which tab-index the primary element of the component has.
	 */
	@Prop() public _tabIndex?: number;

	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		this.ctrl.watchTabIndex(value);
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	@Watch('_target')
	public watchTarget(value?: string): void {
		this.ctrl.watchTarget(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: AlignPropType = 'right';

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: AlignPropType): void {
		this.ctrl.watchTooltipAlign(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: string;

	@Watch('_variant')
	public watchVariant(value?: string): void {
		this.ctrl.watchVariant(value);
	}

	@State() public ariaCurrent: string = '';

	public componentWillLoad(): void {
		if (this.host) {
			this.ctrl.setHostElement(this.host);
		}

		this.ctrl.componentWillLoad({
			href: this._href,
			accessKey: this._accessKey,
			ariaControls: this._ariaControls,
			ariaCurrentValue: this._ariaCurrentValue,
			ariaDescription: this._ariaDescription,
			ariaExpanded: this._ariaExpanded,
			ariaOwns: this._ariaOwns,
			customClass: this._customClass,
			disabled: this._disabled,
			download: this._download,
			hideLabel: this._hideLabel,
			icons: this._icons,
			inline: this._inline,
			label: typeof this._label === 'string' ? this._label : undefined,
			on: this._on,
			role: this._role,
			shortKey: this._shortKey,
			tabIndex: this._tabIndex,
			target: this._target,
			tooltipAlign: this._tooltipAlign,
			variant: this._variant,
		});
	}

	public componentDidRender(): void {
		this.ctrl.syncAnchorListeners();
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host>
				<LinkFC
					accessKey={this.ctrl.getRenderProp('accessKey') || undefined}
					ariaCurrent={this.ariaCurrent}
					ariaControls={this.ctrl.getRenderProp('ariaControls') || undefined}
					ariaDescription={this.ctrl.getRenderProp('ariaDescription') || undefined}
					ariaExpanded={this.ctrl.getRenderProp('ariaExpanded') || undefined}
					ariaOwns={this.ctrl.getRenderProp('ariaOwns') || undefined}
					customClass={this.ctrl.getRenderProp('customClass') || undefined}
					disabled={this.ctrl.getRenderProp('disabled')}
					download={this.ctrl.getRenderProp('download') || undefined}
					handleClick={this.ctrl.handleClick}
					hideLabel={this.ctrl.getRenderProp('hideLabel')}
					href={this.ctrl.getRenderProp('href')}
					icons={this.ctrl.getRenderProp('icons')}
					inline={this.ctrl.getRenderProp('inline')}
					label={this.ctrl.getRenderProp('label')}
					on={this.ctrl.getRenderProp('on')}
					refAnchor={this.ctrl.setAnchorRef}
					role={this.ctrl.getRenderProp('role') || undefined}
					shortKey={this.ctrl.getRenderProp('shortKey') || undefined}
					tabIndex={this.ctrl.getRenderProp('tabIndex') || undefined}
					target={this.ctrl.getRenderProp('target') || undefined}
					tooltipAlign={this.ctrl.getRenderProp('tooltipAlign') || undefined}
					tooltipId={this.ctrl.getTooltipId()}
					setTooltipRef={this.ctrl.setTooltipElementRef}
					variant={this.ctrl.getRenderProp('variant') || undefined}
				/>
			</Host>
		);
	}
}
