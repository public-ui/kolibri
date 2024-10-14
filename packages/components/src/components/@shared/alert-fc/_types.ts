import type { JSXBase } from '@stencil/core/internal';
import type { AlertProps } from '../../../schema';

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	AlertProps & {
		onCloserClick?: () => void;
		onVibrationTimeout?: () => void;
	};

export const DEFAULT_PROPS: Partial<AlertProps> = {
	_level: 1,
	_variant: 'msg',
	_type: 'default',
};
