import { Component, Fragment, h, JSX, Method, State } from '@stencil/core';

import { translate } from '../../i18n';
import { nonce } from '../../utils/dev.utils';
import { API, States, Toast, ToastState } from './types';
import { InternalToast } from './InternalToast';

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
						: localToastState
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

	public render(): JSX.Element {
		return (
			<Fragment>
				{this.state._toastStates.length > 1 && (
					<kol-button
						_label={translate('kol-toast-close-all')}
						class="close-all"
						_on={{
							onClick: () => {
								void this.closeAll();
							},
						}}
					></kol-button>
				)}
				{this.state._toastStates.map((toastState) => (
					<InternalToast toastState={toastState} onClose={() => this.handleClose(toastState)} key={toastState.id} />
				))}
			</Fragment>
		);
	}
}
