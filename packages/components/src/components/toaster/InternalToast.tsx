import { h } from '@stencil/core';
import { ToastState } from './types';
import { KolAlertTag } from '../../core/component-names';

type Props = {
	toastState: ToastState;
	onClose: () => void;
	key: string;
};
export const InternalToast = ({ toastState, onClose, key }: Props) => {
	const handleRef = (element?: HTMLDivElement) => {
		if (typeof toastState.toast.render === 'function' && element) {
			toastState.toast.render(element, { close: () => onClose() });
		}
	};

	return (
		<div class={`toast ${toastState.status}`} key={key}>
			<KolAlertTag
				class="kol-alert alert"
				_alert={true}
				_label={toastState.toast.label}
				_level={0}
				_hasCloser={true}
				_type={toastState.toast.type}
				_variant="card"
				_on={{ onClose }}
			>
				<div ref={handleRef}>{typeof toastState.toast.description === 'string' ? toastState.toast.description : null}</div>
			</KolAlertTag>
		</div>
	);
};
