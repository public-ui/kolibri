import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { ButtonController } from '../../internal/functional-components/button/controller';
import { initButtonControllerFromProps } from '../../internal/functional-components/button/controller';
import { getEmbeddedButtonController, renderButtonFC } from '../../internal/functional-components/button/render';
import type { OptionalButtonProps, RequiredButtonProps } from '../../schema';

export type ButtonProps = Partial<RequiredButtonProps & OptionalButtonProps> & {
	label: string;
	class?: string;
	'data-testid'?: string;
	onClick?: (event: MouseEvent) => void;
	/** Controller owned by the host component that drives the button. Falls back to a cached controller keyed by data-testid/label. */
	buttonCtrl?: ButtonController;
};

const KolButtonFc: FC<ButtonProps> = (props) => {
	const { label, icons, hideLabel, disabled, onClick, class: className, 'data-testid': dataTestId, buttonCtrl, ...other } = props;
	const ctrl = buttonCtrl ?? getEmbeddedButtonController(`button-fc-${dataTestId ?? label}`);

	initButtonControllerFromProps(ctrl, {
		...other,
		_label: label,
		_disabled: disabled,
		_icons: icons,
		_hideLabel: hideLabel,
		_on: { onClick },
	});

	return <Fragment>{renderButtonFC(ctrl, { class: className, dataTestId })}</Fragment>;
};

export default KolButtonFc;
