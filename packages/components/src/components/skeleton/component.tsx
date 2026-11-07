import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonApi } from '../../internal/functional-components/skeleton/api';
import { skeletonPropsConfig } from '../../internal/functional-components/skeleton/api';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { nameProp } from '../../internal/props';
import { Log, type KolFocusOptions, type NamePropType, type SkeletonProps } from '../../schema';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton extends BaseWebComponent<SkeletonApi> implements SkeletonProps, WebComponentInterface<SkeletonApi> {
	/**
	 * Tracks the current count value for the skeleton.
	 */
	@State()
	public count: number = 0;

	/**
	 * The label text displayed on the click button.
	 */
	@State()
	public label: string = 'Label';

	/**
	 * Controls the visibility of the skeleton component.
	 */
	@State()
	public show: boolean = true;

	private readonly buttonRef = createCtaRef<HTMLButtonElement>();

	private intervalId?: ReturnType<typeof setTimeout>;

	protected readonly propsConfig: PropsConfigShape = skeletonPropsConfig;

	/**
	 * Sets the name of the skeleton component.
	 */
	@Prop()
	public _name!: NamePropType;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		nameProp.apply(value, (v) => this.setRenderProp('name', v));
	}

	/**
	 * Emitted when the skeleton has finished loading.
	 */
	@Event() public loaded!: EventEmitter<number>;

	/**
	 * Emitted when the skeleton has been rendered for the first time.
	 */
	@Event() public rendered!: EventEmitter<void>;

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	@delegateFocus('buttonRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	/**
	 * Toggles the visibility of the skeleton component.
	 */
	@Method()
	public async toggle(): Promise<void> {
		this.setState('show', !(this.getState('show') ?? false));
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		nameProp.apply(this._name, (v) => this.setRenderProp('name', v));

		// Emit loaded event every 2 seconds with current count value
		this.intervalId = setInterval(() => {
			this.loaded.emit(this.getState('count') ?? 0);
		}, 2000);
	}

	public componentDidLoad(): void {
		requestAnimationFrame(() => {
			this.rendered.emit();
		});
	}

	public disconnectedCallback(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			Log.debug('button pressed');
			this.handleClick();
		}
	}

	/**
	 * Global keydown listener. Auto-cleaned by Stencil on component removal.
	 */
	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			Log.debug('Show should be toggled');
			void this.toggle();
		}
	}

	public handleClick = (): void => {
		Log.debug('Button clicked, count should be increased');
		this.setState('count', (this.getState('count') ?? 0) + 1);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<SkeletonFC
					count={this.count}
					label={this.label}
					name={this.getRenderProp('name')}
					handleClick={this.handleClick}
					onLoaded={this.loaded}
					onRendered={this.rendered}
					show={this.show}
					refButton={this.buttonRef}
				/>
			</Host>
		);
	}
}
