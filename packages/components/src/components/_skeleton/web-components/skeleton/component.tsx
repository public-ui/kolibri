import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../../../internal/functional-components/generic-types';
import type { SkeletonApi } from '../../../../internal/functional-components/skeleton/api';
import { SkeletonFC } from '../../../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../../../internal/functional-components/skeleton/controller';
import { Log } from '../../../../schema';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<SkeletonApi> {
	private readonly ctrl = new SkeletonController(this);

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	public async focus(): Promise<void> {
		return Promise.resolve(this.ctrl.focus());
	}

	/**
	 * Toggles the visibility of the skeleton component.
	 */
	@Method()
	public async toggle(): Promise<void> {
		return Promise.resolve(this.ctrl.toggle());
	}

	/**
	 * Sets the name of the skeleton component.
	 */
	@Prop()
	public _name!: string;

	@Watch('_name')
	public watchName(value?: string): void {
		this.ctrl.watchName(value);
	}

	@State()
	public count: number = 0;

	@State()
	public label: string = 'Label';

	@State()
	public show: boolean = true;

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			Log.debug('button pressed');
			this.ctrl.handleClick();
		}
	}

	/**
	 * Emitted when the skeleton has finished loading.
	 */
	@Event() public loaded!: EventEmitter<number>;

	/**
	 * Emitted when the skeleton has been rendered for the first time.
	 */
	@Event() public rendered!: EventEmitter<void>;

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.ctrl.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			name: this._name,
		});

		// Set up the callback for emitting loaded events
		this.ctrl.setOnLoadedCallback((count: number) => {
			this.loaded.emit(count);
		});
	}

	public componentDidLoad(): void {
		requestAnimationFrame(() => {
			this.rendered.emit();
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		const { name } = this.ctrl.getProps();
		const { count, label, show } = this;
		return (
			<Host>
				<SkeletonFC
					count={count}
					label={label}
					name={name}
					handleClick={() => this.ctrl.handleClick()}
					onLoaded={this.loaded}
					onRendered={this.rendered}
					show={show}
					refButton={(element) => this.ctrl.setButtonRef(element)}
				/>
			</Host>
		);
	}
}
