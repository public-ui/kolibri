import { BaseButtonWebComponent } from '@public-ui/internals/components/button/base';
import type { ButtonWebComponentInterface } from '@public-ui/internals/controller/button/api';
import { TooltipBehavior } from '@public-ui/internals/controller/tooltip/behavior';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaControlsPropType,
	AriaDescriptionPropType,
	AriaExpandedPropType,
	AriaSelectedPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	CustomClassPropType,
	DisabledPropType,
	HideLabelPropType,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	NamePropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '@public-ui/internals/schema';
import { nonce } from '@public-ui/internals/utils/dev.utils';
import { delegateClick, delegateFocus } from '@public-ui/internals/utils/element-interaction';
import { LitElement, html, type PropertyValues } from 'lit';
import { ButtonLitFC } from './fc/button';
import { buttonLitStyles } from './styles';

/**
 * Builds the orchestrator object for the Lit shell: an instance of the shared
 * `BaseButtonWebComponent` whose state access and host reference delegate to the surrounding
 * LitElement. The Stencil shell reaches the same class through class inheritance; the Lit shell
 * cannot inherit from two base classes, so the orchestrator is created with its prototype and
 * field initializers and patched afterwards:
 *
 * - `setState`/`getState` write reactive Lit state on the host element (`requestUpdate` included),
 * - `host` resolves to the host element,
 * - the tooltip behavior is re-created against the patched state access,
 * - the prototype methods are bound to the orchestrator object.
 */
function createButtonOrchestrator(host: HTMLElement): BaseButtonWebComponent {
	// `Reflect.construct` runs the field initializers of `BaseButtonWebComponent` (and its base
	// `BaseWebComponent`) on an object whose prototype chain carries the orchestrator methods —
	// a plain `.call()` is not possible on a class constructor.
	const prototypeBridge = class {};
	Object.setPrototypeOf(prototypeBridge.prototype, BaseButtonWebComponent.prototype);
	const orchestrator = Reflect.construct(BaseButtonWebComponent as unknown as new () => object, [], prototypeBridge) as BaseButtonWebComponent;
	Object.defineProperties(orchestrator, {
		host: {
			get: () => host,
		},
		setState: {
			value: (key: string, value: unknown): void => {
				(host as unknown as Record<string, unknown>)[key] = value;
				host.requestUpdate();
			},
		},
		getState: {
			value: (key: string): unknown => (host as unknown as Record<string, unknown>)[key],
		},
	});
	(orchestrator as unknown as { stateAccess: { setState: unknown; getState: unknown } }).stateAccess = {
		setState: (orchestrator as unknown as { setState: unknown }).setState,
		getState: (orchestrator as unknown as { getState: unknown }).getState,
	};
	(orchestrator as unknown as { tooltipBehavior: unknown }).tooltipBehavior = new TooltipBehavior(
		(orchestrator as unknown as { stateAccess: never }).stateAccess,
	);
	for (const name of Object.getOwnPropertyNames(BaseButtonWebComponent.prototype)) {
		const value = (orchestrator as unknown as Record<string, unknown>)[name];
		if (typeof value === 'function' && name !== 'constructor') {
			(orchestrator as unknown as Record<string, unknown>)[name] = (value as (...args: unknown[]) => unknown).bind(orchestrator);
		}
	}
	return orchestrator;
}

/**
 * Lit implementation of the public `kol-button`, created for the Lit feasibility spike.
 *
 * The shell keeps exactly what the Stencil shell kept: the public props, the lifecycle and the
 * public methods. All orchestration — prop validation, tooltip, form association, event
 * handling, the render-prop store — is the shared `BaseButtonWebComponent`, and the rendering is
 * the lit-html port of `ButtonFC`. The Stencil decorator mapping:
 *
 * | Stencil                          | Lit                                        |
 * | -------------------------------- | ------------------------------------------ |
 * | `@Prop` + `@Watch`               | `static properties` + `willUpdate`          |
 * | `componentWillLoad`              | first `willUpdate` run (all watchers)       |
 * | `componentDidRender`             | `updated`                                   |
 * | `disconnectedCallback`           | `disconnectedCallback`                      |
 * | `@State`                         | reactive property (`state: true`)           |
 * | `@Method`                        | plain class methods                         |
 * | `@Element()` / `Host`            | the element itself                          |
 */
class KolButtonLit extends LitElement implements ButtonWebComponentInterface {
	static properties = {
		_accessKey: { attribute: '_access-key' },
		_ariaControls: { attribute: '_aria-controls' },
		_ariaDescription: { attribute: '_aria-description' },
		_ariaExpanded: { attribute: '_aria-expanded', type: Boolean },
		_ariaSelected: { attribute: '_aria-selected', type: Boolean },
		_customClass: { attribute: '_custom-class' },
		_disabled: { attribute: '_disabled', type: Boolean },
		_hideLabel: { attribute: '_hide-label', type: Boolean },
		_icons: { attribute: '_icons' },
		_inline: { attribute: '_inline', type: Boolean },
		_label: { attribute: '_label' },
		_name: { attribute: '_name' },
		_on: { attribute: false },
		_role: { attribute: '_role' },
		_shortKey: { attribute: '_short-key' },
		_syncValueBySelector: { attribute: false },
		_tooltipAlign: { attribute: '_tooltip-align' },
		_type: { attribute: '_type' },
		_value: { attribute: false },
		_variant: { attribute: '_variant' },
		ariaDescriptionId: { state: true },
	};

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	public _accessKey?: AccessKeyPropType = undefined;

	/**
	 * Defines which elements are controlled by this component.
	 */
	public _ariaControls?: AriaControlsPropType = undefined;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	public _ariaDescription?: AriaDescriptionPropType = undefined;

	/**
	 * Defines whether the interactive element of the component expanded something.
	 */
	public _ariaExpanded?: AriaExpandedPropType = undefined;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab).
	 */
	public _ariaSelected?: AriaSelectedPropType = undefined;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	public _customClass?: CustomClassPropType = undefined;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	public _disabled?: DisabledPropType = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 */
	public _hideLabel?: HideLabelPropType = false;

	/**
	 * Defines the icon classnames.
	 */
	public _icons?: IconsPropType = undefined;

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	public _inline?: InlinePropType = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline,
	 * caption, summary, etc.). Set to `''` to enable the expert slot.
	 */
	public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	public _name?: NamePropType = undefined;

	/**
	 * Defines the callback functions for button events.
	 */
	public _on?: ButtonCallbacksPropType<StencilUnknown> = undefined;

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	public _role?: AlternativeButtonLinkRolePropType = undefined;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	public _shortKey?: ShortKeyPropType = undefined;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	public _syncValueBySelector?: SyncValueBySelectorPropType = undefined;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	public _type?: ButtonTypePropType = 'button';

	/**
	 * Defines the value of the element.
	 */
	public _value?: StencilUnknown = undefined;

	/**
	 * Defines which variant should be used for presentation.
	 */
	public _variant?: VariantClassNamePropType = undefined;

	/** DOM id of the visually-hidden span that carries the aria description. */
	public ariaDescriptionId: string = nonce();

	private readonly orchestrator: BaseButtonWebComponent = createButtonOrchestrator(this);

	private initialized = false;

	static styles = buttonLitStyles;

	public constructor() {
		super();
		this.orchestrator.initFormAssociation();
	}

	public connectedCallback(): void {
		super.connectedCallback();
		// The Stencil runtime marks its elements as `hydrated` once rendered, and the theming
		// mechanism sets `data-themed` once the theme styles are attached; focus delegation keys
		// off both. The Lit spike attaches its styles statically and renders synchronously after
		// the first update, so both markers are set right away.
		this.classList.add('hydrated');
		this.dataset.themed = '';
	}

	/** The host element, as the Stencil `@Element()` decorator provides it. */
	public get host(): HTMLElement {
		return this;
	}

	/** The ref the public `focus()`/`click()` methods delegate to. */
	public get ctaRef() {
		return this.orchestrator.ctaRef;
	}

	protected willUpdate(changedProperties: PropertyValues): void {
		if (!this.initialized) {
			// Initial pass — the Lit equivalent of `componentWillLoad`: every prop watcher runs
			// once against the current values (assigned or default), like the Stencil shell does.
			this.initialized = true;
			this.orchestrator.unsetButtonTabIndex();

			this.watchAccessKey(this._accessKey);
			this.watchAriaControls(this._ariaControls);
			this.watchAriaDescription(this._ariaDescription);
			this.watchAriaExpanded(this._ariaExpanded);
			this.watchAriaSelected(this._ariaSelected);
			this.watchCustomClass(this._customClass);
			this.watchDisabled(this._disabled);
			this.watchHideLabel(this._hideLabel);
			this.watchIcons(this._icons);
			this.watchInline(this._inline);
			this.watchLabel(this._label);
			this.watchName(this._name);
			this.watchOn(this._on);
			this.watchRole(this._role);
			this.watchShortKey(this._shortKey);
			this.watchSyncValueBySelector(this._syncValueBySelector);
			this.watchTooltipAlign(this._tooltipAlign);
			this.watchType(this._type);
			this.watchValue(this._value);
			this.watchVariant(this._variant);

			this.orchestrator.initTooltipBehavior();
		} else {
			for (const [key] of changedProperties) {
				switch (key) {
					case '_accessKey':
						this.watchAccessKey(this._accessKey);
						break;
					case '_ariaControls':
						this.watchAriaControls(this._ariaControls);
						break;
					case '_ariaDescription':
						this.watchAriaDescription(this._ariaDescription);
						break;
					case '_ariaExpanded':
						this.watchAriaExpanded(this._ariaExpanded);
						break;
					case '_ariaSelected':
						this.watchAriaSelected(this._ariaSelected);
						break;
					case '_customClass':
						this.watchCustomClass(this._customClass);
						break;
					case '_disabled':
						this.watchDisabled(this._disabled);
						break;
					case '_hideLabel':
						this.watchHideLabel(this._hideLabel);
						break;
					case '_icons':
						this.watchIcons(this._icons);
						break;
					case '_inline':
						this.watchInline(this._inline);
						break;
					case '_label':
						this.watchLabel(this._label);
						break;
					case '_name':
						this.watchName(this._name);
						break;
					case '_on':
						this.watchOn(this._on);
						break;
					case '_role':
						this.watchRole(this._role);
						break;
					case '_shortKey':
						this.watchShortKey(this._shortKey);
						break;
					case '_syncValueBySelector':
						this.watchSyncValueBySelector(this._syncValueBySelector);
						break;
					case '_tooltipAlign':
						this.watchTooltipAlign(this._tooltipAlign);
						break;
					case '_type':
						this.watchType(this._type);
						break;
					case '_value':
						this.watchValue(this._value);
						break;
					case '_variant':
						this.watchVariant(this._variant);
						break;
				}
			}
		}
	}

	protected updated(): void {
		// The Lit equivalent of `componentDidRender`.
		this.orchestrator.syncTooltipListeners();
	}

	public disconnectedCallback(): void {
		super.disconnectedCallback();
		this.orchestrator.destroyTooltipBehavior();
	}

	protected render(): unknown {
		return html`${ButtonLitFC(this.orchestrator.getButtonFCProps())}`;
	}

	// --- Watchers (one per prop, delegating into the shared orchestrator) ---

	public watchAccessKey(value?: AccessKeyPropType): void {
		this.orchestrator.applyAccessKey(value, this._shortKey);
	}

	public watchAriaControls(value?: AriaControlsPropType): void {
		this.orchestrator.applyAriaControls(value);
	}

	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.orchestrator.applyAriaDescription(value);
	}

	public watchAriaExpanded(value?: AriaExpandedPropType): void {
		this.orchestrator.applyAriaExpanded(value);
	}

	public watchAriaSelected(value?: AriaSelectedPropType): void {
		this.orchestrator.applyAriaSelected(value);
	}

	public watchCustomClass(value?: CustomClassPropType): void {
		this.orchestrator.applyCustomClass(value);
	}

	public watchDisabled(value?: DisabledPropType): void {
		this.orchestrator.applyDisabled(value);
	}

	public watchHideLabel(value?: HideLabelPropType): void {
		this.orchestrator.applyHideLabel(value);
	}

	public watchIcons(value?: IconsPropType): void {
		this.orchestrator.applyIcons(value);
	}

	public watchInline(value?: InlinePropType): void {
		this.orchestrator.applyInline(value);
	}

	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.orchestrator.applyLabel(value);
	}

	public watchName(value?: NamePropType): void {
		this.orchestrator.applyName(value);
	}

	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		this.orchestrator.applyOn(value);
	}

	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		this.orchestrator.applyRole(value);
	}

	public watchShortKey(value?: ShortKeyPropType): void {
		this.orchestrator.applyShortKey(value, this._accessKey);
	}

	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.orchestrator.applySyncValueBySelector(value);
	}

	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.orchestrator.applyTooltipAlign(value);
	}

	public watchType(value?: ButtonTypePropType): void {
		this.orchestrator.applyType(value);
	}

	public watchValue(value?: StencilUnknown): void {
		this.orchestrator.applyValue(value);
	}

	public watchVariant(value?: VariantClassNamePropType): void {
		this.orchestrator.applyVariant(value);
	}

	// --- Public methods (same signatures as the Stencil `@Method`s) ---

	/**
	 * Returns the current value.
	 */
	public getValue(): Promise<StencilUnknown> {
		return Promise.resolve(this._value);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@delegateFocus('ctaRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@delegateClick('ctaRef')
	public async click(): Promise<void> {
		return Promise.resolve();
	}
}

if (!customElements.get('kol-button-lit')) {
	customElements.define('kol-button-lit', KolButtonLit);
}

export { KolButtonLit };
