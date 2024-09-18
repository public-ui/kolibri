import type { SingleSelectWatches, SingleSelectProps, MsgPropType, OptionsPropType, Option, SelectOption, W3CInputValue, Stringified } from '../../schema';
import { watchBoolean, watchString, validateMsg, validateOptions } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';

import type { Generic } from 'adopted-style-sheets';
export class SingleSelectController extends InputIconController implements SingleSelectWatches {
	protected readonly component: Generic.Element.Component & SingleSelectProps;
	private readonly keyOptionMap = new Map<string, Option<string>>();

	public constructor(component: Generic.Element.Component & SingleSelectProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as string);
		}
	};

	protected readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
		}
	};

	public validateOptions(value?: OptionsPropType): void {
		validateOptions(this.component, value, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
	}
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}
	public validateMsg(value?: Stringified<MsgPropType>): void {
		validateMsg(this.component, value);
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateOptions(this.component._options);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
		this.validatePlaceholder(this.component._placeholder);
	}
}
