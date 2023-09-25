import { Component, Fragment, h, JSX, Method, State } from '@stencil/core';

import { translate } from '../../i18n';
import { nonce } from '../../utils/dev.utils';
import { API, States, Toast, ToastState } from './types';

const TRANSITION_TIMEOUT = 300;

@Component({
	tag: 'kol-toast-container',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolToastContainer implements API {
	@State() public state: States = {
		_toastStates: [],
	};

	// Stencil requires async function:
	// eslint-disable-next-line @typescript-eslint/require-await
	@Method()
	async enqueue(toast: Toast) {
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
					localToastState === newToastState
						? {
								...localToastState,
								status: 'settled',
						  }
						: localToastState
				),
			};
		}, TRANSITION_TIMEOUT);
	}

	private handleClose(toastState: ToastState) {
		this.state = {
			...this.state,
			_toastStates: this.state._toastStates.map((localToastState) => {
				if (localToastState === toastState) {
					localToastState.status = 'removing';
				}
				return localToastState;
			}),
		};

		setTimeout(() => {
			this.state = {
				...this.state,
				_toastStates: this.state._toastStates.filter((localToastState) => localToastState !== toastState),
			};
		}, TRANSITION_TIMEOUT);
	}

	private handleCloseAllClick() {
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

	public render(): JSX.Element {
		return (
			<Fragment>
				{this.state._toastStates.length > 1 && (
					<kol-button _label={translate('kol-toast-close-all')} class="close-all" _on={{ onClick: this.handleCloseAllClick.bind(this) }}></kol-button>
				)}
				{this.state._toastStates.map((toastState) => (
					<kol-toast
						_label={toastState.toast.label}
						_status={toastState.status}
						_type={toastState.toast.type}
						_on={{ onClose: () => this.handleClose(toastState) }}
						key={toastState.id}
					>
						{toastState.toast.description}
					</kol-toast>
				))}
			</Fragment>
		);
	}
}
