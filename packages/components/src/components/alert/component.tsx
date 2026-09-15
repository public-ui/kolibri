import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import type { AlertApi } from '../../internal/functional-components/alert/api';
import { alertPropsConfig } from '../../internal/functional-components/alert/api';
import { AlertFC } from '../../internal/functional-components/alert/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { alertProp, alertTypeProp, alertVariantProp, hasCloserProp, labelProp, levelProp } from '../../internal/props';
import type { AlertProps, AlertTypePropType, AlertVariantPropType, HeadingLevel, KoliBriAlertEventCallbacks, LabelPropType } from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * The **Alert** component provides visual feedback to users. It consists of a color-coded container, a heading, content text, and an icon. The icon used and the color scheme depend on the `_type` of the alert.
 *
 * @slot - The content of the notification.
 */
@Component({
	tag: 'kol-alert',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAlert extends BaseWebComponent<AlertApi> implements AlertProps, WebComponentInterface<AlertApi> {
	@Element() protected readonly host?: HTMLKolAlertElement;

	private alertTimeout?: ReturnType<typeof setTimeout>;

	// --- Closer (ButtonFC rendered directly, so the closer's tooltip behavior lives here) ---

	private readonly translateCloseAlert = translate('kol-close-alert');
	protected readonly closerRef = createCtaRef<HTMLButtonElement>();
	private readonly closerTooltipBehavior = new TooltipBehavior(this.stateAccess);

	private readonly handleAlertTimeout = (): void => {
		this.watchAlert(false);
	};

	private readonly handleCloserClick = (event: MouseEvent): void => {
		// The predecessor rendered the transitional kol-button-wc, whose click handler stopped
		// the propagation — kept so closer clicks do not leak to listeners on the alert host.
		event.stopPropagation();
		this.closerTooltipBehavior.hideTooltip();
		this._on?.onClose?.(new Event('Close'));
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(alertPropsConfig);

		this.watchAlert(this._alert);
		this.watchHasCloser(this._hasCloser);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchType(this._type);
		this.watchVariant(this._variant);

		this.closerTooltipBehavior.componentWillLoad({ label: this.translateCloseAlert, align: 'left' });
	}

	public componentDidRender(): void {
		if (this.closerRef.el) {
			this.closerTooltipBehavior.syncListeners(undefined, this.closerRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		this.closerTooltipBehavior.destroy();
		this.syncAlertEffects(false);
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<AlertFC
					alert={this.getRenderProp('alert')}
					handleCloserClick={this.handleCloserClick}
					closerAriaDescriptionId={this.closerAriaDescriptionId}
					hasCloser={this.getRenderProp('hasCloser')}
					headingId={this.headingId}
					label={this.getRenderProp('label')}
					level={this.getRenderProp('level')}
					refCloserButton={this.closerRef}
					refCloserTooltip={this.closerTooltipBehavior.setTooltipElementRef}
					type={this.getRenderProp('type')}
					variant={this.getRenderProp('variant')}
				>
					<slot />
				</AlertFC>
			</Host>
		);
	}

	// --- @State ---

	@State() public headingId: string = createUniqueId('alert-heading');

	@State() public closerAriaDescriptionId: string = nonce();

	// --- Props + Watchers ---

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop() public _alert?: boolean = false;
	@Watch('_alert')
	public watchAlert(value?: boolean): void {
		alertProp.apply(value, (v) => {
			this.setRenderProp('alert', v);
			this.syncAlertEffects(v);
		});
	}

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;
	@Watch('_hasCloser')
	public watchHasCloser(value?: boolean): void {
		hasCloserProp.apply(value, (v) => this.setRenderProp('hasCloser', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
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
	 * Gibt die EventCallback-Function für das Schließen des Alerts an.
	 */
	@Prop() public _on?: KoliBriAlertEventCallbacks;

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: AlertTypePropType = 'default';
	@Watch('_type')
	public watchType(value?: AlertTypePropType): void {
		alertTypeProp.apply(value, (v) => this.setRenderProp('type', v));
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: AlertVariantPropType = 'msg';
	@Watch('_variant')
	public watchVariant(value?: AlertVariantPropType): void {
		alertVariantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	// --- Alert side effects ---

	/**
	 * Keeps the live-region side effects in sync with the alert render prop: while `role="alert"`
	 * is active, the device vibrates once (coarse pointers with a prior user gesture only) and a
	 * timeout removes the role after 10 seconds so a recurring value change is announced again.
	 * The predecessor ran both effects on every render of the functional component — the watcher
	 * here runs them exactly once per value change.
	 *
	 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
	 * - https://googlechrome.github.io/samples/vibration/
	 * - Ongoing discussion: https://github.com/public-ui/kolibri/issues/7191
	 */
	private syncAlertEffects(active: boolean): void {
		clearTimeout(this.alertTimeout);
		if (!active) {
			return;
		}

		if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
			const ua = navigator.userActivation;
			const hasGesture = ua?.isActive || ua?.hasBeenActive;
			if (hasGesture && matchMedia('(any-pointer: coarse)').matches) {
				try {
					navigator.vibrate([100, 75, 100, 75, 100]);
				} catch {
					/* no-op */
				}
			}
		}

		this.alertTimeout = setTimeout(() => this.handleAlertTimeout(), 10000);
	}
}
