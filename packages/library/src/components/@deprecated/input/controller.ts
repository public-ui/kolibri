import { Generic } from '@public-ui/core';
import { ButtonProps } from '../../../types/button-link';
import { isIcon } from '../../../types/icon';
import { InputTypeOnDefault } from '../../../types/input/types';
import { a11yHintDisabled, devHint } from '../../../utils/a11y.tipps';
import { objectObjectHandler, parseJson, setState, watchBoolean, watchNumber, watchString, watchValidator } from '../../../utils/prop.validators';
import { isString } from '../../../utils/validator';
import { ControlledInputController } from '../../input-adapter-leanup/controller';
import { KoliBriInputIcon } from '../../input-text/types';
import { Props, Watches } from './types';
import { Props as AdapterProps } from '../../input-adapter-leanup/types';
import { Stringified } from '../../../types/common';

const beforePatchIcon = (value: unknown, nextState: Map<string, unknown>): void => {
	const icon = value as KoliBriInputIcon;
	if (typeof icon === 'object' && icon !== null) {
		if (isString(icon.right, 1)) {
			icon.right = { icon: icon.right as string };
		}
		if (isString(icon.left, 1)) {
			icon.left = { icon: icon.left as string };
		}
		nextState.set('_icon', icon);
	}
};

export class InputController extends ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props & AdapterProps;

	public hideLabel = false;

	public constructor(component: Generic.Element.Component & Props, name: string) {
		super(component, name);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAccessKey(value?: string): void {
		watchString(this.component, '_accessKey', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAdjustHeight(value?: boolean): void {
		watchBoolean(this.component, '_adjustHeight', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateDisabled(value?: boolean): void {
		watchBoolean(this.component, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateError(value?: string): void {
		watchString(this.component, '_error', value, { minLength: 0 });
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateHideLabel(value?: boolean): void {
		watchBoolean(this.component, '_hideLabel', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateHint(value?: string): void {
		watchString(this.component, '_hint', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateIcon(value?: Stringified<KoliBriInputIcon>): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<KoliBriInputIcon>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			watchValidator(
				this.component,
				'_icon',
				(value): boolean => {
					return (
						typeof value === 'object' &&
						value !== null &&
						(isString((value as KoliBriInputIcon).left, 1) ||
							isIcon((value as KoliBriInputIcon).left) ||
							isString((value as KoliBriInputIcon).right, 1) ||
							isIcon((value as KoliBriInputIcon).right))
					);
				},
				new Set(['KoliBriInputIcon']),
				value,
				{
					hooks: {
						beforePatch: beforePatchIcon,
					},
					required: true,
				}
			);
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateId(value?: string): void {
		watchString(this.component, '_id', value);
		if (typeof value === 'undefined') {
			devHint(`Eine eindeutige ID an den Eingabefeldern ist nicht zwingend erforderlich, könnte aber für die E2E-Tests relevant sein.`);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateName(value?: string): void {
		watchString(this.component, '_name', value);
		if (typeof value === 'undefined') {
			devHint(`Ein Name an den Eingabefeldern ist nicht zwingend erforderlich, könnte aber für die Autocomplete-Funktion des Eingabefeldes relevant sein.`);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateOn(value?: InputTypeOnDefault): void {
		if (typeof value === 'object') {
			setState(this.component, '_on', value);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateSmartButton(value?: ButtonProps | string): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<ButtonProps>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			setState(this.component, '_smartButton', value);
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateTabIndex(value?: number): void {
		watchNumber(this.component, '_tabIndex', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAccessKey(this.component._accessKey);
		this.validateAdjustHeight(this.component._adjustHeight);
		this.validateError(this.component._error);
		this.validateDisabled(this.component._disabled);
		this.validateHideLabel(this.component._hideLabel);
		this.validateHint(this.component._hint);
		this.validateIcon(this.component._icon);
		this.validateId(this.component._id);
		this.validateName(this.component._name);
		this.validateSmartButton(this.component._smartButton);
		this.validateOn(this.component._on);
		this.validateTabIndex(this.component._tabIndex);
	}

	protected onBlur(event: Event): void {
		this.component._alert = true;
		this.component._touched = true;
		if (typeof this.component._on?.onBlur === 'function') {
			this.component._on.onBlur(event);
		}
	}

	protected onChange(event: Event): void {
		if (typeof this.component._on?.onChange === 'function') {
			this.component._on.onChange(event, (event.target as HTMLInputElement).value);
		}
	}

	protected onClick(event: Event): void {
		if (typeof this.component._on?.onClick === 'function') {
			this.component._on.onClick(event);
		}
	}

	protected onFocus(event: Event): void {
		this.component._alert = true;
		if (typeof this.component._on?.onFocus === 'function') {
			this.component._on.onFocus(event);
		}
	}

	public setValue(event: Event, value: string | number | boolean): void {
		if (typeof this.component._on?.onChange === 'function') {
			this.component._on.onChange(event, value);
		}
	}

	/**
	 * Hinweis: In der Subklasse 'InputPasswordController'
	 *          werden die Methoden onBlur und onFocus
	 *          überschrieben.
	 *          Es werden somit zunächst die Methoden der
	 *          Subklasse ausgeführt und danach die der
	 *          Oberklassen.
	 */
	public readonly onFacade = {
		onBlur: this.onBlur.bind(this),
		onChange: this.onChange.bind(this),
		onClick: this.onClick.bind(this),
		onFocus: this.onFocus.bind(this),
	};
}
