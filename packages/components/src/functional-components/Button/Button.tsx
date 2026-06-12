import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { ButtonController } from '../../internal/functional-components/button/controller';
import { initButtonControllerFromProps } from '../../internal/functional-components/button/controller';
import { getEmbeddedButtonController, renderButtonFC } from '../../internal/functional-components/button/render';
import type { ButtonCallbacksPropType, OptionalButtonProps, RequiredButtonProps, StencilUnknown } from '../../schema';

export type ButtonProps = Partial<RequiredButtonProps & OptionalButtonProps> & {
	label: string;
	class?: string;
	'data-testid'?: string;
	onClick?: (event: MouseEvent) => void;
	/** Underscore-prefixed callbacks as passed by InternalButtonProps spreads (e.g. smart buttons). */
	_on?: ButtonCallbacksPropType<StencilUnknown>;
	/** Controller owned by the host component that drives the button. Falls back to a cached controller keyed by data-testid/label. */
	buttonCtrl?: ButtonController;
};

const KolButtonFc: FC<ButtonProps> = (props) => {
	const { label, icons, hideLabel, disabled, onClick, class: className, 'data-testid': dataTestId, buttonCtrl, _on, ...other } = props;
	const ctrl = buttonCtrl ?? getEmbeddedButtonController(`button-fc-${dataTestId ?? label}`);

	initButtonControllerFromProps(ctrl, {
		...other,
		_label: label,
		_disabled: disabled,
		_icons: icons,
		_hideLabel: hideLabel,
		// A directly passed onClick takes precedence, but must not drop the
		// remaining _on callbacks (e.g. the smart button's user handlers).
		_on: onClick ? { ..._on, onClick } : _on,
	});

	return <Fragment>{renderButtonFC(ctrl, { class: className, dataTestId })}</Fragment>;
};

export default KolButtonFc;
