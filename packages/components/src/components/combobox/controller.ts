import type { ComboboxWatches, Option, ComboboxProps } from '@public-ui/schema';
import { watchBoolean, watchArryString, watchString } from '@public-ui/schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class ComboboxController extends InputIconController implements ComboboxWatches {
	protected readonly component: Generic.Element.Component & ComboboxProps;
	private readonly keyOptionMap = new Map<string, Option<string>>();

	public constructor(component: Generic.Element.Component & ComboboxProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<string> | undefined => this.keyOptionMap.get(key);

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as string);
		}
	};

	public validateOptions(value?: string[]): void {
		watchArryString(this.component, '_options', value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateOptions(this.component._options);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
	}
}
