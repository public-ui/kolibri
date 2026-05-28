import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import { LinkFC } from '../../internal/functional-components/link/component';
import { LinkController } from '../../internal/functional-components/link/controller';
import type {
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	KoliBriIconsProp,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	TooltipAlignPropType,
} from '../../schema';
import { setClick } from '../../utils/element-click';
import { delegateFocus, setFocus } from '../../utils/element-focus';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

@Component({
	tag: 'kol-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLink extends BaseWebComponent<LinkApi> implements WebComponentInterface<LinkApi> {
	@Element() private readonly host?: HTMLKolLinkElement;

	private readonly ctrl = new LinkController(this.stateAccess);

	/**
	 * Sets focus on the internal anchor element.
	 */
	@Method()
	public async focus(): Promise<void> {
		const anchor = this.ctrl.getAnchorRef();
		if (anchor) return delegateFocus(this.host!, () => setFocus(anchor));
	}

	/**
	 * Clicks the internal anchor element.
	 */
	@Method()
	public async click(): Promise<void> {
		const anchor = this.ctrl.getAnchorRef();
		if (anchor) return setClick(anchor);
	}

	private readonly handleAnchorClick = (event: MouseEvent | KeyboardEvent): void => {
		const { href, shouldDispatchKolEvent } = this.ctrl.handleAnchorClick(event);

		if (shouldDispatchKolEvent && this.host) {
			dispatchDomEvent(this.host, KolEvent.click, href);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<LinkFC
					accessKey={this.ctrl.getRenderProp('accessKey')}
					ariaControls={this.ctrl.getRenderProp('ariaControls')}
					ariaCurrent={this.ariaCurrent}
					ariaCurrentValue={this.ctrl.getRenderProp('ariaCurrentValue')}
					ariaDescription={this.ctrl.getRenderProp('ariaDescription')}
					ariaExpanded={this.ctrl.getRenderProp('ariaExpanded')}
					ariaOwns={this.ctrl.getRenderProp('ariaOwns')}
					customClass={this.ctrl.getRenderProp('customClass')}
					disabled={this.ctrl.getRenderProp('disabled')}
					download={this.ctrl.getRenderProp('download')}
					hideLabel={this.ctrl.getRenderProp('hideLabel')}
					href={this.ctrl.getRenderProp('href')}
					icons={this.ctrl.getRenderProp('icons')}
					inline={this.ctrl.getRenderProp('inline')}
					label={this.ctrl.getRenderProp('label')}
					on={this.ctrl.getRenderProp('on')}
					role={this.ctrl.getRenderProp('role')}
					shortKey={this.ctrl.getRenderProp('shortKey')}
					tabIndex={this.ctrl.getRenderProp('tabIndex')}
					target={this.ctrl.getRenderProp('target')}
					tooltipAlign={this.ctrl.getRenderProp('tooltipAlign')}
					variant={this.ctrl.getRenderProp('variant')}
					onAnchorClick={this.handleAnchorClick}
					tooltipId={this.ctrl.getTooltipId()}
					refTooltipFloating={this.ctrl.setTooltipRef}
					refAnchor={(el) => this.ctrl.setAnchorRef(el)}
				/>
			</Host>
		);
	}

	// ── Props ──────────────────────────────────────────────────────────────

	/** Defines the key combination that can be used to trigger or focus the component's interactive element. */
	@Prop() public _accessKey?: string;

	/** Defines which elements are controlled by this component. */
	@Prop() public _ariaControls?: string;

	/** Defines the value for the aria-current attribute. */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

	/** Defines the value for the aria-description attribute. */
	@Prop() public _ariaDescription?: string;

	/** Marks this element as open/expanded, or that the connected element is open/expanded. */
	@Prop() public _ariaExpanded?: boolean;

	/** Defines the contextual relationship between a parent and its child elements. */
	@Prop() public _ariaOwns?: string;

	/** Defines the custom class attribute if _variant="custom" is set. */
	@Prop() public _customClass?: string;

	/** Makes the element not focusable and ignore all events. */
	@Prop() public _disabled?: boolean = false;

	/** Tells the browser that the link contains a file. Optionally sets the filename. */
	@Prop() public _download?: string;

	/** Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. */
	@Prop() public _hideLabel?: boolean = false;

	/** Sets the target URI of the link or citation source. */
	@Prop() public _href!: string;

	/** Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`). */
	@Prop() public _icons?: KoliBriIconsProp | string;

	/** Defines whether the component is displayed inline without enforcing a minimum size of 44px. */
	@Prop() public _inline?: boolean = true;

	/** Defines the visible or semantic label of the component. Set to `false` to enable the expert slot. */
	@Prop() public _label?: string | false;

	/** Defines the callback functions for links. */
	@Prop() public _on?: LinkOnCallbacksPropType;

	/** Defines the role of the components primary element. */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/** Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud. */
	@Prop() public _shortKey?: string;

	/** Defines which tab-index the primary element of the component has. */
	@Prop() public _tabIndex?: number;

	/** Defines where to open the link. */
	@Prop() public _target?: LinkTargetPropType;

	/** Defines where to show the Tooltip preferably: top, right, bottom or left. */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	/** Defines which variant should be used for presentation. */
	@Prop() public _variant?: string;

	// ── State ─────────────────────────────────────────────────────────────

	/** Empty string means aria-current is not set. */
	@State() public ariaCurrent: string = '';

	// ── Watchers ──────────────────────────────────────────────────────────

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		this.ctrl.watchAccessKey(value);
	}

	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		this.ctrl.watchAriaControls(value);
	}

	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		this.ctrl.watchAriaCurrentValue(value);
	}

	@Watch('_ariaDescription')
	public watchAriaDescription(value?: string): void {
		this.ctrl.watchAriaDescription(value);
	}

	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.ctrl.watchAriaExpanded(value);
	}

	@Watch('_ariaOwns')
	public watchAriaOwns(value?: string): void {
		this.ctrl.watchAriaOwns(value);
	}

	@Watch('_customClass')
	public watchCustomClass(value?: string): void {
		this.ctrl.watchCustomClass(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.ctrl.watchDisabled(value);
	}

	@Watch('_download')
	public watchDownload(value?: string): void {
		this.ctrl.watchDownload(value);
	}

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.ctrl.watchHideLabel(value);
	}

	@Watch('_href')
	public watchHref(value?: string): void {
		this.ctrl.watchHref(value);
	}

	@Watch('_icons')
	public watchIcons(value?: KoliBriIconsProp | string): void {
		this.ctrl.watchIcons(value);
	}

	@Watch('_inline')
	public watchInline(value?: boolean): void {
		this.ctrl.watchInline(value);
	}

	@Watch('_label')
	public watchLabel(value?: string | false): void {
		this.ctrl.watchLabel(value);
	}

	@Watch('_on')
	public watchOn(value?: LinkOnCallbacksPropType): void {
		this.ctrl.watchOn(value);
	}

	@Watch('_role')
	public watchRole(value?: string): void {
		this.ctrl.watchRole(value);
	}

	@Watch('_shortKey')
	public watchShortKey(value?: string): void {
		this.ctrl.watchShortKey(value);
	}

	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		this.ctrl.watchTabIndex(value);
	}

	@Watch('_target')
	public watchTarget(value?: LinkTargetPropType): void {
		this.ctrl.watchTarget(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.ctrl.watchTooltipAlign(value);
	}

	@Watch('_variant')
	public watchVariant(value?: string): void {
		this.ctrl.watchVariant(value);
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────

	public componentWillLoad(): void {
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
			label: this._label,
			on: this._on,
			role: this._role,
			shortKey: this._shortKey,
			tabIndex: this._tabIndex,
			target: this._target,
			tooltipAlign: this._tooltipAlign,
			variant: this._variant,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}
}
