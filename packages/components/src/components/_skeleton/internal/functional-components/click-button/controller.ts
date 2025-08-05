import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonRefs, ClickButtonRenderProps, ClickButtonRenderStates } from './component';

export class ClickButtonController
	extends BaseController<ClickButtonRenderProps, ClickButtonRenderStates>
	implements ControllerInterface<ClickButtonRenderProps, ClickButtonCallbacks, ClickButtonRefs, Record<never, never>, { keydown: KeyboardEvent }>
{
	private buttonRef?: HTMLButtonElement;

	public constructor(controller: WebComponentInterface<Record<never, never>, ClickButtonRenderStates>) {
		super(controller, {
			label: '',
		});
	}

	public componentWillLoad(props: ClickButtonRenderProps): void {
		const { label } = props;
		this.watchLabel(label);
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.setProp('label', normalized);
		}
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public focusButton = (): void => {
		this.buttonRef?.focus();
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'e' && !event.defaultPrevented) {
			this.setState('eCount', this.component.eCount + 1);
			event.preventDefault();
		}
	};
}
