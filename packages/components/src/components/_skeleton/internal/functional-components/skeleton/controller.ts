import type { CountPropType } from '../../schema/props/count';
import { normalizeCount, validateCount } from '../../schema/props/count';
import type { LabelPropType } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { normalizeShow, validateShow } from '../../schema/props/show';
import { BaseController } from '../base-controller';
import type { ClickButtonRenderProps } from '../click-button/component';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonListeners, SkeletonMethods, SkeletonRefs, SkeletonRenderProps, SkeletonRenderStates } from './component';

export class SkeletonController
	extends BaseController<SkeletonRenderProps, SkeletonRenderStates>
	implements ControllerInterface<SkeletonRenderProps, SkeletonRenderStates, SkeletonCallbacks, SkeletonRefs, SkeletonMethods, SkeletonListeners>
{
	private readonly clickButtonController: ClickButtonController;

	public label: LabelPropType = 'Label';

	public constructor(component: WebComponentInterface<SkeletonRenderProps & ClickButtonRenderProps, SkeletonRenderStates>) {
		super(component, {
			count: 0,
			name: '',
			show: false,
		});
		this.clickButtonController = new ClickButtonController(component);
	}

	public componentWillLoad(props: SkeletonRenderProps): void {
		const { count, name, show } = props;
		this.watchCount(count);
		this.watchName(name);
		this.watchShow(show);
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

	public watchShow(value?: ShowPropType): void {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.setProp('show', normalized);
		}
	}

	public toggle(): void {
		this.setProp('show', !this.getProps().show);
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			this.setProp('show', false);
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
