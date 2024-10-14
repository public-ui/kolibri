import type { ToastState } from '../../schema';
import { h } from '@stencil/core';
import { KolAlertTag } from '../../core/component-names';

type Props = {
	key: string;
	onClose: () => void;
	onRef: (element?: HTMLDivElement) => void;
	toastState: ToastState;
};

export const InternalToast = ({ key, onClose, onRef, toastState }: Props) => {
	return (
		<div class={`toast ${toastState.status}`} key={key}>
			<KolAlertTag
				class="alert"
				_alert={true}
				_label={toastState.toast.label}
				_level={0}
				_hasCloser={true}
				_type={toastState.toast.type}
				_variant={toastState.toast.alertVariant || toastState.toast.variant || 'card'}
				_on={{ onClose }}
			>
				<div ref={onRef}>{typeof toastState.toast.description === 'string' ? toastState.toast.description : null}</div>
			</KolAlertTag>
		</div>
	);
};
