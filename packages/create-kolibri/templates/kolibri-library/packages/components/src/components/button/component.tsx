import { h, Component, JSX, Prop, State, Watch, Host } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { {{capital name}}ButtonVariants, OptionalProps, OptionalStates, RequiredProps, RequiredStates, States } from './types';

/**
 * @internal
 */
@Component({
	tag: '{{kebab name}}-button',
	shadow: false,
})
export class {{capital name}}Button implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * Why we use underscored props?
	 *
	 * Because we want to exclude the standard HTML attributes from the prop intellisense (ide auto completion).
	 *
	 * We will see later!
	 */

	/**
	 * The disabled prop represents the disabled state of the button.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * The variant prop represents the variant of the button.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * The icon represents the icon that is displayed on the button.
	 */
	@Prop() public _icon?: string;

	/**
	 * The label represents the text that is displayed on the button.
	 */
	@Prop() public _label!: string;

	/**
	 * The variant prop represents the variant of the button.
	 */
	@Prop() public _variant?: {{capital name}}ButtonVariants = 'secondary';

	/**
	 * The state represents the current internal state of the component.
	 */
	@State() public state: States = {
		_label: 'default label',
		_variant: 'secondary',
	};

	/**
	 * We always validate the props before we set the state.
	 *
	 * Props from outside can be invalid, so we have to validate them.
	 * So the inner state is always valid.
	 */

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.state._disabled = value === true;
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.state._hideLabel = value === true;
	}

	@Watch('_icon')
	public validateIcon(value?: string): void {
		if (typeof value === 'string') {
			this.state._icon = value;
		}
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		if (typeof value === 'string') {
			this.state._label = value;
		}
	}

	@Watch('_variant')
	public validateVariant(value?: {{capital name}}ButtonVariants): void {
		if (typeof value === 'string' && (value === 'primary' || value === 'secondary' || value === 'tertiary')) {
			switch (value) {
				case 'primary':
					this.state._variant = 'primary';
					break;
				case 'tertiary':
					this.state._variant = 'ghost';
					break;
				case 'secondary':
				default:
					this.state._variant = 'secondary';
			}
		}
	}

	/**
	 * We need this lifecycle hook to validate the props before the
	 * component first rendering.
	 *
	 * On-time validation is enough.
	 */
	public componentWillLoad(): void {
		this.validateDisabled(this._disabled);
		this.validateHideLabel(this._hideLabel);
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
		this.validateVariant(this._variant);
	}

	public render(): JSX.Element {
		const { _disabled, _hideLabel, _icon, _label, _variant } = this.state;
		return (
			<Host>
				<kol-button _disabled={_disabled} _icon={_icon} _iconOnly={_hideLabel} _label={_label} _variant={_variant}></kol-button>
			</Host>
		);
	}
}
