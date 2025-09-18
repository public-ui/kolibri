import type { CountPropType } from '../../schema/props/count';
import { normalizeCount, validateCount } from '../../schema/props/count';
import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import { BaseController } from '../base-controller';
import type { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { SkeletonApi } from './api';

export class SkeletonController extends BaseController<SkeletonApi['Props'], WebComponentInterface<SkeletonApi>> implements ControllerInterface<SkeletonApi> {
	public constructor(
		states: WebComponentInterface<SkeletonApi>,
		private readonly clickButtonController: ClickButtonController,
	) {
		super(states, {
			count: 0,
			name: '',
		});
	}

	public componentWillLoad(props: SkeletonApi['Props']): void {
		const { count, name } = props;
		this.watchCount(count);
		this.watchName(name);
		this.watchLabel(this.component.label);
		this.clickButtonController.componentWillLoad({
			label: this.component.label,
		});
	}

	public watchCount(value?: CountPropType): void {
		const normalized = normalizeCount(value);
		if (validateCount(normalized)) {
			this.setProp('count', normalized);
			this.setState('count', normalized);
		}
	}

	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.setProp('name', normalized);
		}
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.setState('label', normalized);
			this.clickButtonController.watchLabel(normalized);
		}
	}

	public toggle(): Promise<void> {
		this.setState('show', !this.component.show);
		return Promise.resolve();
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			void this.toggle();
		}
	};

	public handleClick = (): void => {
		const { count } = this.getProps();
		const nextCount = count + 1;
		this.setProp('count', nextCount);
		this.setState('count', nextCount);
		this.component.loaded.emit(nextCount);
	};

	public focusButton = (): void => {
		this.clickButtonController.focusButton();
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
