import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import { linkPropsConfig } from '../../internal/functional-components/link/api';
import { LinkFC } from '../../internal/functional-components/link/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaOwnsProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkRoleProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
import type {
	AriaCurrentValuePropType,
	KolFocusOptions,
	KoliBriIconsProp,
	LinkOnCallbacksPropType,
	Stringified,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { nonce } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { UnsubscribeFunction } from './ariaCurrentService';
import { onLocationChange } from './ariaCurrentService';

/**
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLink extends BaseWebComponent<LinkApi> implements WebComponentInterface<LinkApi> {
	@Element() protected readonly host?: HTMLKolLinkElement;

	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();

	// --- Composed behaviors ---

	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(linkPropsConfig);

		accessKeyProp.apply(this._accessKey, (v) => this.setRenderProp('accessKey', v));
		ariaControlsProp.apply(this._ariaControls, (v) => this.setRenderProp('ariaControls', v));
		ariaCurrentValueProp.apply(this._ariaCurrentValue, (v) => this.setRenderProp('ariaCurrentValue', v));
		ariaDescriptionProp.apply(this._ariaDescription, (v) => this.setRenderProp('ariaDescription', v));
		ariaExpandedProp.apply(this._ariaExpanded, (v) => this.setRenderProp('ariaExpanded', v));
		ariaOwnsProp.apply(this._ariaOwns, (v) => this.setRenderProp('ariaOwns', v));
		customClassProp.apply(this._customClass, (v) => this.setRenderProp('customClass', v));
		disabledProp.apply(this._disabled, (v) => this.setRenderProp('disabled', v));
		downloadProp.apply(this._download, (v) => this.setRenderProp('download', v));
		hideLabelProp.apply(this._hideLabel, (v) => this.setRenderProp('hideLabel', v));
		hrefProp.apply(this._href, (v) => this.setRenderProp('href', v));
		spanIconsProp.apply(this._icons, (v) => this.setRenderProp('icons', v));
		inlineProp.apply(this._inline, (v) => this.setRenderProp('inline', v));
		this.applyLabel(this._label);
		linkCallbacksProp.apply(this._on, (v) => this.setRenderProp('on', v));
		linkRoleProp.apply(this._role, (v) => this.setRenderProp('role', v));
		shortKeyProp.apply(this._shortKey, (v) => this.setRenderProp('shortKey', v));
		tabIndexProp.apply(this._tabIndex, (v) => this.setRenderProp('tabIndex', v));
		linkTargetProp.apply(this._target, (v) => this.setRenderProp('target', v));
		this.applyTooltipAlign(this._tooltipAlign);
		variantProp.apply(this._variant, (v) => this.setRenderProp('variant', v));

		validateAccessAndShortKey(this._accessKey, this._shortKey);

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			const href = this.getRenderProp('href');
			const ariaCurrentValue = this.getRenderProp('ariaCurrentValue');
			const newValue = location === href ? ariaCurrentValue : '';
			if (this.getState('ariaCurrent') !== newValue) {
				this.setState('ariaCurrent', newValue);
			}
		});

		this.tooltipBehavior.componentWillLoad({
			label: this.getTooltipLabel(),
			align: this.getRenderProp('tooltipAlign'),
		});
	}

	public componentDidRender(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
		this.tooltipBehavior.destroy();
	}

	// --- Click handling ---

	private readonly handleAnchorClick = (event: Event): void => {
		this.tooltipBehavior.hideTooltip();
		const disabled = this.getRenderProp('disabled');
		if (disabled === true) {
			event.preventDefault();
			return;
		}
		const href = this.getRenderProp('href');
		const on = this.getRenderProp('on');
		if (typeof on?.onClick === 'function') {
			on.onClick(event, href);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, href);
		}
	};

	// --- Tooltip helpers ---

	private getTooltipLabel(): string {
		const label = this.getRenderProp('label');
		if (typeof label === 'string' && label.length > 0) {
			return label;
		}
		const href = this.getRenderProp('href');
		return typeof href === 'string' ? href : '';
	}

	private applyLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.setState('expertSlot', value === '');
			this.tooltipBehavior.watchLabel(this.getTooltipLabel());
		});
	}

	private applyTooltipAlign(value?: string): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
	}

	// --- Public methods ---

	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Refs ---

	private readonly setAnchorRef = (el?: HTMLAnchorElement): void => {
		this.ctaRef(el);
	};

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<LinkFC
					accessKey={this.getRenderProp('accessKey')}
					ariaControls={this.getRenderProp('ariaControls')}
					ariaCurrent={this.ariaCurrent}
					ariaCurrentValue={this.getRenderProp('ariaCurrentValue')}
					ariaDescription={this.getRenderProp('ariaDescription')}
					ariaDescriptionId={this.ariaDescriptionId}
					ariaExpanded={this.getRenderProp('ariaExpanded')}
					ariaOwns={this.getRenderProp('ariaOwns')}
					customClass={this.getRenderProp('customClass')}
					disabled={this.getRenderProp('disabled')}
					download={this.getRenderProp('download')}
					handleAnchorClick={this.handleAnchorClick}
					hideLabel={this.getRenderProp('hideLabel')}
					href={this.getRenderProp('href')}
					icons={this.getRenderProp('icons')}
					inline={this.getRenderProp('inline')}
					label={this.getRenderProp('label')}
					on={this.getRenderProp('on')}
					refAnchor={this.setAnchorRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
					role={this.getRenderProp('role')}
					shortKey={this.getRenderProp('shortKey')}
					tabIndex={this.getRenderProp('tabIndex')}
					target={this.getRenderProp('target')}
					tooltipAlign={this.getRenderProp('tooltipAlign')}
					variant={this.getRenderProp('variant')}
					expertSlot={this.expertSlot}
				/>
			</Host>
		);
	}

	// --- @State ---

	@State() public ariaCurrent: string = '';

	@State() public ariaDescriptionId: string = nonce();

	@State() public expertSlot: boolean = false;

	// --- Props + Watchers ---

	@Prop() public _accessKey?: string;
	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
	}

	@Prop() public _ariaControls?: string;
	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => this.setRenderProp('ariaControls', v));
	}

	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;
	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: string): void {
		ariaCurrentValueProp.apply(value, (v) => this.setRenderProp('ariaCurrentValue', v));
	}

	@Prop() public _ariaDescription?: string;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: string): void {
		ariaDescriptionProp.apply(value, (v) => this.setRenderProp('ariaDescription', v));
	}

	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => this.setRenderProp('ariaExpanded', v));
	}

	@Prop() public _ariaOwns?: string;
	@Watch('_ariaOwns')
	public watchAriaOwns(value?: string): void {
		ariaOwnsProp.apply(value, (v) => this.setRenderProp('ariaOwns', v));
	}

	@Prop() public _customClass?: string;
	@Watch('_customClass')
	public watchCustomClass(value?: string): void {
		customClassProp.apply(value, (v) => this.setRenderProp('customClass', v));
	}

	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	@Prop() public _download?: string;
	@Watch('_download')
	public watchDownload(value?: string): void {
		downloadProp.apply(value, (v) => this.setRenderProp('download', v));
	}

	@Prop() public _hideLabel?: boolean = false;
	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.setRenderProp('hideLabel', v));
	}

	@Prop() public _href!: string;
	@Watch('_href')
	public watchHref(value?: string): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}

	@Prop() public _icons?: Stringified<KoliBriIconsProp>;
	@Watch('_icons')
	public watchIcons(value?: Stringified<KoliBriIconsProp>): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	@Prop() public _inline?: boolean = true;
	@Watch('_inline')
	public watchInline(value?: boolean): void {
		inlineProp.apply(value, (v) => this.setRenderProp('inline', v));
	}

	@Prop() public _label?: string;
	@Watch('_label')
	public watchLabel(value?: string): void {
		this.applyLabel(value);
	}

	@Prop() public _on?: LinkOnCallbacksPropType;
	@Watch('_on')
	public watchOn(value?: LinkOnCallbacksPropType): void {
		linkCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	@Prop() public _role?: 'tab' | 'treeitem';
	@Watch('_role')
	public watchRole(value?: 'tab' | 'treeitem'): void {
		linkRoleProp.apply(value, (v) => this.setRenderProp('role', v));
	}

	@Prop() public _shortKey?: string;
	@Watch('_shortKey')
	public watchShortKey(value?: string): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
	}

	@Prop() public _tabIndex?: number;
	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		tabIndexProp.apply(value, (v) => this.setRenderProp('tabIndex', v));
	}

	@Prop() public _target?: string;
	@Watch('_target')
	public watchTarget(value?: string): void {
		linkTargetProp.apply(value, (v) => this.setRenderProp('target', v));
	}

	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';
	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
