import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../../types/button-link';
import { InputTypeOnDefault } from '../../../types/input/types';
import { a11yHintDisabled, devHint } from '../../../utils/a11y.tipps';
import { objectObjectHandler, parseJson, setState, watchBoolean, watchString } from '../../../utils/prop.validators';
import { validateTabIndex } from '../../../utils/validators/tab-index';
import { ControlledInputController } from '../../input-adapter-leanup/controller';
import { Props as AdapterProps } from '../../input-adapter-leanup/types';
import { Props, Watches } from './types';

type ValueChangeListener = (value: string) => void;

export class InputController extends ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props & AdapterProps;

	public hideLabel = false;

	private readonly valueChangeListeners: ValueChangeListener[] = [];

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAccessKey(value?: string): void {
		watchString(this.component, '_accessKey', value);
	}

	public validateAdjustHeight(value?: boolean): void {
		watchBoolean(this.component, '_adjustHeight', value);
	}

	public validateDisabled(value?: boolean): void {
		watchBoolean(this.component, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	public validateError(value?: string): void {
		watchString(this.component, '_error', value);
	}

	public validateHideLabel(value?: boolean): void {
		watchBoolean(this.component, '_hideLabel', value);
	}

	public validateHint(value?: string): void {
		watchString(this.component, '_hint', value);
	}

	public validateId(value?: string): void {
		watchString(this.component, '_id', value, {
			hooks: {
				afterPatch: this.syncFormAssociatedName,
			},
		});
		if (typeof value === 'undefined') {
			devHint(`Eine eindeutige ID an den Eingabefeldern ist nicht zwingend erforderlich, könnte aber für die E2E-Tests relevant sein.`);
		}
	}

	public validateName(value?: string): void {
		watchString(this.component, '_name', value, {
			hooks: {
				afterPatch: this.syncFormAssociatedName,
			},
		});
		if (typeof value === 'undefined') {
			devHint(
				`Ein Name an den Eingabefeldern ist nicht zwingend erforderlich, kann aber für die Autocomplete-Funktion und für das statische Versenden des Eingabefeldes relevant sein.`
			);
		}
	}

	public validateOn(value?: InputTypeOnDefault): void {
		if (typeof value === 'object') {
			setState(this.component, '_on', value);
		}
	}

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

	public validateTabIndex(value?: number): void {
		validateTabIndex(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAccessKey(this.component._accessKey);
		this.validateAdjustHeight(this.component._adjustHeight);
		this.validateError(this.component._error);
		this.validateDisabled(this.component._disabled);
		this.validateHideLabel(this.component._hideLabel);
		this.validateHint(this.component._hint);
		this.validateId(this.component._id);
		this.validateName(this.component._name);
		this.validateSmartButton(this.component._smartButton);
		this.validateOn(this.component._on);
		this.validateTabIndex(this.component._tabIndex);
		this.syncFormAssociatedName();
	}

	protected onBlur(event: Event): void {
		this.component._alert = true;
		this.component._touched = true;
		if (typeof this.component._on?.onBlur === 'function') {
			this.component._on.onBlur(event);
		}
	}

	protected onChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.setFormAssociatedValue(value);
		this.valueChangeListeners.forEach((listener) => listener(value));
		if (typeof this.component._on?.onChange === 'function') {
			/**
			 * TODO
			 * Value-Handling muss für InputDate und InputNumber optimiert werden
			 * - value
			 * - valueAsNumber
			 * - valueAsDate
			 */
			this.component._on.onChange(event, value);
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
		this.setFormAssociatedValue(value as string);
		if (typeof this.component._on?.onChange === 'function') {
			this.component._on.onChange(event, value);
		}
	}

	public addValueChangeListener(listener: ValueChangeListener) {
		this.valueChangeListeners.push(listener);
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
