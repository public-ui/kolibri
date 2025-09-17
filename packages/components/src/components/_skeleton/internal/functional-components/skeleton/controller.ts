import type { CountPropType } from '../../schema/props/count';
import { normalizeCount, validateCount } from '../../schema/props/count';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import { BaseController } from '../base-controller';
import type { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface } from '../generic-types';
import type { SkeletonApi } from './api';

export class SkeletonController extends BaseController<SkeletonApi['Props'], SkeletonApi['States']> implements ControllerInterface<SkeletonApi> {
	public constructor(
		states: SkeletonApi['States'],
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
		this.clickButtonController.componentWillLoad({
			label: this.component.label,
		});
	}

	public watchCount(value?: CountPropType): void {
		const normalized = normalizeCount(value);
		if (validateCount(normalized)) {
			this.setProp('count', normalized);
		}
	}

	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.setProp('name', normalized);
		}
	}

	public toggle(): void {
		this.setState('show', !this.component.show);
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			this.toggle();
		}
	};

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');
	};

	public focusButton = (): void => {
		this.clickButtonController.focusButton();
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
