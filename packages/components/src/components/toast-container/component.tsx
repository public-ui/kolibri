import { Component, h, Host, JSX, Method, State } from '@stencil/core';
import { API, States, ToastState } from './types';
import { Toast } from '../toast/toaster';

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

	@Method()
	enqueue(toast: Toast) {
		this.state = {
			...this.state,
			_toastStates: [
				{
					toast,
					status: 'adding',
				},
				...this.state._toastStates,
			],
		};
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
		}, 300); // fixme use event handler
	}

	public render(): JSX.Element {
		return (
			<Host>
				<div>Toast container here.</div>
				toasts:
				<ul>
					{this.state._toastStates.map((toastState) => (
						<li>
							{toastState.status}: {toastState.toast.label}
						</li>
					))}
				</ul>
				{this.state._toastStates.map((toastState) => (
					<kol-toast _label={toastState.toast.label} _type={toastState.toast.type} _on={{ onClose: () => this.handleClose(toastState) }}>
						{toastState.toast.description}
					</kol-toast>
				))}
			</Host>
		);
	}
}
