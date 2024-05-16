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
					localToastState.id === newToastState.id
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

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeAll() {
		this.state = {
			...this.state,
			_toastStates: this.state._toastStates.map((localToastState) => ({
				...localToastState,
				status: 'removing',
			})),
		};

		setTimeout(() => {
			this.state = {
				...this.state,
				_toastStates: [],
			};
		}, TRANSITION_TIMEOUT);
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
						onClose={() => this.handleClose(toastState)}
						onRef={(element) => this.handleToastRef(toastState, element)}
						toastState={toastState}
					/>
				))}
			</Host>
		);
	}
}
