import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import type { AlertApi } from '../../internal/functional-components/alert/api';
import { alertPropsConfig } from '../../internal/functional-components/alert/api';
import { AlertFC } from '../../internal/functional-components/alert/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { alertProp, alertTypeProp, alertVariantProp, hasCloserProp, labelProp, levelProp } from '../../internal/props';
import type { AlertProps, AlertTypePropType, AlertVariantPropType, HeadingLevel, KoliBriAlertEventCallbacks, LabelPropType } from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * Transitional `kol-alert-wc` — a `shadow:false` wrapper that renders `AlertFC` directly into the
 * light DOM.
 *
 * This exists because legacy consumers (table-settings, …) render `<kol-alert-wc>` inside their
 * own shadow DOM and rely on being able to reach the inner `.kol-alert` CSS classes from their
 * stylesheets. A `shadow:true` element would encapsulate those classes behind a shadow boundary,
 * breaking consumer styling.
 *
 * When a consumer migrates to the Skeleton pattern, it should render `AlertFC` directly (inline
 * JSX) instead of instantiating this element. Once all consumers have migrated, this component
 * can be deleted.
 *
 * @internal
 */
@Component({
	tag: 'kol-alert-wc',
	shadow: false,
})
export class KolAlertWc extends BaseWebComponent<AlertApi> implements AlertProps, WebComponentInterface<AlertApi> {
	@Element() protected readonly host?: HTMLKolAlertWcElement;

	private alertTimeout?: ReturnType<typeof setTimeout>;

	private readonly handleAlertTimeout = (): void => {
		this.watchAlert(false);
	};

	private readonly handleCloserClick = (): void => {
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
	}

	public disconnectedCallback(): void {
		this.syncAlertEffects(false);
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<AlertFC
				alert={this.getRenderProp('alert')}
				handleCloserClick={this.handleCloserClick}
				hasCloser={this.getRenderProp('hasCloser')}
				headingId={this.headingId}
				label={this.getRenderProp('label')}
				level={this.getRenderProp('level')}
				type={this.getRenderProp('type')}
				variant={this.getRenderProp('variant')}
			>
				<slot />
			</AlertFC>
		);
	}

	// --- @State ---

	@State() public headingId: string = createUniqueId('alert-heading');

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
