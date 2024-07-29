import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, State } from '@stencil/core';

import { translate } from '../../i18n';
import { nonce } from '../../utils/dev.utils';
import { InternalToast } from './InternalToast';

import type { Toast, ToasterAPI, ToasterStates, ToastRenderFunction, ToastState } from '../../schema';
import { KolButtonTag } from '../../core/component-names';

const TRANSITION_TIMEOUT = 300;

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

	/* Keep track of render functions, so we call each only once. */
	private knownRenderFunctions = new Set<ToastRenderFunction>();

	/**
	 * Hides all active toaster elements. Removes the toast container. The toaster instance can no longer be used.
	 * @param {Toast} toast
	 */
	// Stencil requires async function:
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async enqueue(toast: Toast) {
		const newToastState: ToastState = {
			toast,
			status: 'adding',
			id: `toast-${nonce()}`,
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
		this.state = {
			...this.state,
			_toastStates: this.state._toastStates.map((localToastState) => {
				if (localToastState.id === toastState.id) {
					localToastState.status = 'removing';
				}
				return localToastState;
			}),
		};

		setTimeout(() => {
			this.state = {
				...this.state,
				_toastStates: this.state._toastStates.filter((localToastState) => localToastState.id !== toastState.id),
			};
		}, TRANSITION_TIMEOUT);
	}

	/**
	 * Hides all active toaster elements.
	 * @param {boolean} immediate
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeAll(immediate: boolean = false) {
		if (immediate) {
			this.state = {
				...this.state,
				_toastStates: [],
			};
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
			}, TRANSITION_TIMEOUT);
		}
	}

	private handleToastRef(toastState: ToastState, element?: HTMLDivElement) {
		if (element && typeof toastState.toast.render === 'function' && !this.knownRenderFunctions.has(toastState.toast.render)) {
			this.knownRenderFunctions.add(toastState.toast.render);
			toastState.toast.render(element, { close: () => this.handleClose(toastState) });
		}
	}

	private createHandleClose = (toastState: ToastState) => () => {
		this.handleClose(toastState);
	};

	private createHandleToastRef = (toastState: ToastState) => (element?: HTMLDivElement) => {
		this.handleToastRef(toastState, element);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-toast-container">
				{this.state._toastStates.length > 1 && (
					<KolButtonTag
						_label={translate('kol-toast-close-all')}
						class="close-all"
						_on={{
							onClick: () => {
								void this.closeAll();
							},
						}}
					></KolButtonTag>
				)}
				{this.state._toastStates.map((toastState) => (
					<InternalToast
						key={toastState.id}
						onClose={this.createHandleClose(toastState)}
						onRef={this.createHandleToastRef(toastState)}
						toastState={toastState}
					/>
				))}
			</Host>
		);
	}
}
