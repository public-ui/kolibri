import { h } from '@stencil/core';
import KolAlertFc from '../../functional-components/Alert';
import type { ToastState } from '../../schema';

type Props = {
	key: string;
	onClose: () => void;
	onRef: (element?: HTMLDivElement) => void;
	toastState: ToastState;
};

export const InternalToast = ({ key, onClose, onRef, toastState }: Props) => {
	return (
		<div class={`toast ${toastState.status}`} key={key}>
			<KolAlertFc
				class="alert"
				alert={true}
				label={toastState.toast.label}
				level={0}
				hasCloser={true}
				type={toastState.toast.type}
				variant={toastState.toast.alertVariant || toastState.toast.variant || 'card'}
				onCloserClick={onClose}
			>
				<div ref={onRef}>{typeof toastState.toast.description === 'string' ? toastState.toast.description : null}</div>
			</KolAlertFc>
		</div>
	);
};
