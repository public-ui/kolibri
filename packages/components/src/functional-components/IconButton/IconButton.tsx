import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolButtonFc, { type ButtonProps } from '../Button';
import KolIconFc, { type IconProps } from '../Icon';

type IconType = Partial<Omit<IconProps, 'icons'>> & {
	componentName: 'icon';
	icon?: string;
	class?: never;

	onClick?: (event: MouseEvent) => void;
};

type ButtonType = Partial<Omit<ButtonProps, 'icons'>> & {
	componentName: 'button';
	icon?: string;
	label?: string;
	class?: string;

	onClick?: (event: MouseEvent) => void;
};

export type IconButtonProps = IconType | ButtonType;

/**
 * `KolIconButtonFc` is a functional component that renders either a Button or an Icon based on the provided props.
 *
 * Depending on the value of the `componentName` prop, either a Button (`KolButtonFc`) or an Icon (`KolIconFc`) is rendered.
 * Both components support optional `icon` props for displaying an icon and an optional `onClick` handler for user interactions.
 *
 * This component combines the flexibility of rendering either a button with an optional label or a simple icon, while ensuring that unnecessary props for the selected element are not passed.
 *
 * Supported props:
 * - `componentName`: Specifies whether a 'button' or 'icon' should be rendered. Default is 'button'.
 * - `label`: An optional label, which is only shown for Buttons.
 * - `icon`: The name of the icon (e.g., "home", "edit") or the Codicon class used for the icon display.
 * - `class`: Optional CSS class for additional styling customization.
 * - `onClick`: Optional click handler for user interactions.
 *
 * Example usage:
 * ```tsx
 * <KolIconButtonFc componentName="button" label="Submit" icon="check" onClick={handleClick} />
 * <KolIconButtonFc componentName="icon" icon="alert" onClick={handleClick} />
 * ```
 *
 * @param {IconButtonProps} props - The properties that customize the component, including the selection of the component type (Button or Icon) and other specific attributes.
 * @returns {JSX.Element} - The rendered JSX element (Button or Icon).
 */
const KolIconButtonFc: FC<IconButtonProps> = (props) => {
	const { componentName = 'button', label, icon, onClick, ...other } = props;
	const Component = componentName === 'button' ? KolButtonFc : KolIconFc;

	return <Component label={label || ''} hideLabel icons={`codicon codicon-${icon}`} onClick={onClick} {...other} />;
};

export default KolIconButtonFc;
