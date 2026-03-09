import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import { translate } from '../../i18n';
import { IconFC } from '../../internal/functional-components/icon/component';
import type { AlertType } from '../../schema';
import { bem } from '../../schema/bem-registry';

const alertBem = bem.forBlock('kol-alert');
const BEM_CLASS_ALERT__ICON = alertBem('icon');

/**
 * The icon uses a visually-hidden span instead of an aria-label because the Alert might be referenced as content for aria-describedby.
 * In this scenario, Firefox with NVDA does not properly read the aria-label, so the visually-hidden span ensures correct screen reader behavior.
 * @see https://github.com/public-ui/kolibri/issues/7119
 */
const ALERT_ICON_CONFIG: Record<AlertType | 'default', { label: string; icon: string }> = {
	error: {
		label: translate('kol-error'),
		icon: 'kolicon-alert-error',
	},
	info: {
		label: translate('kol-info'),
		icon: 'kolicon-alert-info',
	},
	warning: {
		label: translate('kol-warning'),
		icon: 'kolicon-alert-warning',
	},
	success: {
		label: translate('kol-success'),
		icon: 'kolicon-alert-success',
	},
	default: {
		label: translate('kol-message'),
		icon: 'kolicon-alert-info',
	},
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type = 'default' }) => {
	const config = ALERT_ICON_CONFIG[type || 'default'];
	return (
		<>
			<span class="visually-hidden">{config.label}</span>
			<IconFC class={BEM_CLASS_ALERT__ICON} label="" icons={config.icon} />
		</>
	);
};

export default AlertIcon;
