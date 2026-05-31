import type { KolFocusOptions } from '../../../schema';
import { Log } from '../../../schema';
import { nameProp } from '../../props';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { SkeletonApi } from './api';
import { skeletonPropsConfig } from './api';

export class SkeletonController extends BaseController<SkeletonApi> implements ControllerInterface<SkeletonApi> {
	private readonly clickButtonCtrl: ClickButtonController;
	private intervalId?: ReturnType<typeof setTimeout>;

	public constructor(stateAccess: StateAccess<SkeletonApi>) {
		super(stateAccess, skeletonPropsConfig);

		this.clickButtonCtrl = new ClickButtonController(BaseWebComponent.stateLess);
		this.startLoadedEventInterval();
	}

	public componentWillLoad(props: ResolvedInputProps<SkeletonApi>): void {
		const { name } = props;
		this.watchName(name);

		this.clickButtonCtrl.componentWillLoad({
			label: 'Click me',
		});
	}

	public watchName(value?: string): void {
		nameProp.apply(value, (v) => {
			this.setRenderProp('name', v);
		});
	}

	public toggle(): void {
		this.setState('show', !(this.getState?.('show') ?? false));
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			void this.toggle();
		}
	};

	public handleClick = (): void => {
		Log.debug('Button clicked, count should be increased');
		this.setState('count', (this.getState?.('count') ?? 0) + 1);
	};

	public focus(options?: KolFocusOptions): void {
		this.clickButtonCtrl.focus(options);
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonCtrl.setButtonRef(element);
	};

	private startLoadedEventInterval(): void {
		// Emit loaded event every 2 seconds with current count value
		this.intervalId = setInterval(() => {
			this.emitLoaded(this.getState?.('count') ?? 0);
		}, 2000);
	}

	private emitLoaded(count: number): void {
		// This method will be used by the web component to emit the loaded event
		// The web component needs to call this method to actually emit the event
		// We use a callback approach to let the web component handle the emission
		if (this.onLoadedCallback) {
			this.onLoadedCallback(count);
		}
	}

	private onLoadedCallback?: (count: number) => void;

	public setOnLoadedCallback(callback: (count: number) => void): void {
		this.onLoadedCallback = callback;
	}

	public destroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}
}
