import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, State } from '@stencil/core';

import { translate } from '../../i18n';
import { createUniqueId } from '../../utils/dev.utils';

import { KolButtonTag } from '../../core/component-names';
import { KolToastItemFc } from '../../functional-components';
import type { Toast, ToasterAPI, ToasterStates, ToastRenderFunction, ToastState } from '../../schema';

const TRANSITION_TIMEOUT = 300;

/**
 * @deprecated Will be removed in the next major version. For more information, please refer to: https://github.com/public-ui/kolibri/issues/8372
 * @internal
 */
@Component({
	tag: 'kol-toast-container',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolToastContainer implements ToasterAPI {
	@State() public state: ToasterStates = {
		_toastStates: [],
	};

	private readonly translateToastCloseAll = translate('kol-toast-close-all');

	/* Keep track of render functions, so we call each only once. */
	private knownRenderFunctions = new Set<ToastRenderFunction>();

	// Stencil requires async function:
	/**
	 * Adds a toast to the queue.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async enqueue(toast: Toast) {
		const newToastState: ToastState = {
			toast: {
				...toast,
				variant: 'card',
			},
			status: 'adding',
			id: createUniqueId('toast'),
		};
		this.state = {
			...this.state,
			_toastStates: [newToastState, ...this.state._toastStates],
		};

		setTimeout(() => {
			this.state = {
				...this.state,
				_toastStates: this.state._toastStates.map((localToastState) =>
					localToastState.id === newToastState.id && localToastState.status !== 'removing'
						? {
								...localToastState,
								status: 'settled',
							}
						: localToastState,
				),
			};
		}, TRANSITION_TIMEOUT);

		return () => {
			this.handleClose(newToastState);
		};
	}

	private handleClose(toastState: ToastState) {
		const current = this.state._toastStates.find((t) => t.id === toastState.id);
		if (!current || current.status === 'removing') {
			return;
		}

		this.state = {
			...this.state,
			_toastStates: this.state._toastStates.map((localToastState) =>
				localToastState.id === toastState.id ? { ...localToastState, status: 'removing' } : localToastState,
			),
		};

		setTimeout(() => {
			this.state = {
				...this.state,
				_toastStates: this.state._toastStates.filter((localToastState) => localToastState.id !== toastState.id),
			};
			if (typeof toastState.toast.render === 'function') {
				this.knownRenderFunctions.delete(toastState.toast.render);
			}
			toastState.toast.onClose?.();
		}, TRANSITION_TIMEOUT);
	}

	/**
	 * Closes all toasts.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeAll(immediate: boolean = false) {
		if (immediate) {
			this.state = {
				...this.state,
				_toastStates: [],
			};
			this.knownRenderFunctions.clear();
		} else {
			const toastsToClose = [...this.state._toastStates]; // Create a snapshot of the open toasts at the time closeAll has been called

			this.state = {
				...this.state,
				_toastStates: toastsToClose.map((localToastState) => ({
					...localToastState,
					status: 'removing',
				})),
			};

			setTimeout(() => {
				this.state = {
					...this.state,
					_toastStates: this.state._toastStates.filter((toastState) => toastsToClose.every((toastToClose) => toastToClose.id !== toastState.id)),
				};
				toastsToClose.forEach((toastState) => {
					if (typeof toastState.toast.render === 'function') {
						this.knownRenderFunctions.delete(toastState.toast.render);
					}
					toastState.toast.onClose?.();
				});
			}, TRANSITION_TIMEOUT);
		}
	}

	private handleToastRef(toastState: ToastState, element?: HTMLDivElement) {
		if (element && typeof toastState.toast.render === 'function' && !this.knownRenderFunctions.has(toastState.toast.render)) {
			this.knownRenderFunctions.add(toastState.toast.render);
			toastState.toast.render(element, { close: () => this.handleClose(toastState) });
		}
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-toast-container">
				{this.state._toastStates.length > 1 && (
					<KolButtonTag
						_label={this.translateToastCloseAll}
						class="kol-toast-container__button-close-all"
						_on={{
							onClick: () => {
								void this.closeAll();
							},
						}}
					></KolButtonTag>
				)}
				{this.state._toastStates.map((toastState) => (
					<KolToastItemFc
						key={toastState.id}
						onClose={() => this.handleClose(toastState)}
						ref={(element?: HTMLDivElement) => this.handleToastRef(toastState, element)}
						toast={toastState.toast}
						status={toastState.status}
					/>
				))}
			</Host>
		);
	}
}
