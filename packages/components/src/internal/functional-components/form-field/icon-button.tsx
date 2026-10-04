import { h, type FunctionalComponent as FC } from '@stencil/core';
import { KolButtonWcTag } from '../../../core/component-names';
import type { OptionalButtonProps, RequiredButtonProps, VariantClassNamePropType } from '../../../schema';
import { IconFC } from '../icon/component';

export type WcButtonFCProps = Partial<RequiredButtonProps & OptionalButtonProps> & {
	label: string;
	class?: string;
	onClick?: (event: MouseEvent) => void;
};

/**
 * Renders the transitional `kol-button-wc` for the legacy form field adapters in
 * `functional-components/`. The skeleton form fields render `ButtonFC` through `createButtonItem`.
 */
export const WcButtonFC: FC<WcButtonFCProps> = (props) => {
	const { label, icons, hideLabel, disabled, onClick, ...other } = props;

	return <KolButtonWcTag _label={label} _disabled={disabled} _icons={icons} _hideLabel={hideLabel} _on={{ onClick }} {...other} />;
};

type IconType = {
	componentName: 'icon';
	icon?: string;
	class?: string;
	label?: string;
	style?: { [key: string]: string };
	onClick?: (event: MouseEvent) => void;
};

type ButtonType = Partial<Omit<WcButtonFCProps, 'icons'>> & {
	componentName: 'button';
	icon?: string;
	label?: string;
	class?: string;
	buttonVariant?: VariantClassNamePropType;
	onClick?: (event: MouseEvent) => void;
};

export type IconButtonFCProps = IconType | ButtonType;

/**
 * Icon-only button (`componentName: 'button'`) or plain icon (`componentName: 'icon'`) of the legacy
 * form field adapters. Props other than `label`, `icon` and `onClick` are passed on last and override
 * the defaults.
 */
export const IconButtonFC: FC<IconButtonFCProps> = (props) => {
	const { componentName = 'button', label, icon, onClick, ...other } = props;
	const Component = componentName === 'button' ? WcButtonFC : IconFC;

	return <Component label={label || ''} hideLabel icons={`${icon}`} onClick={onClick} {...other} />;
};
