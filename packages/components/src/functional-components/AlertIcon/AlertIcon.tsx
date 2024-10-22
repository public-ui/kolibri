import { h, type FunctionalComponent as FC } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import type { AlertType } from '../../schema';
import { translate } from '../../i18n';

const Icon: FC<{ ariaLabel: string; icon: string; label?: string }> = (props) => {
	return <KolIconTag class="heading-icon" _label={props.label ? '' : props.ariaLabel} _icons={props.icon} />;
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type, label }) => {
	switch (type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" label={label} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" label={label} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" label={label} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" label={label} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" label={label} />;
	}
};

export default AlertIcon;
