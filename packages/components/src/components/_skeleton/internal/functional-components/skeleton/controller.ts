import type { SkeletonState } from './component';

export type WatchCallback<T> = (value?: T) => void;

export abstract class BaseController<State> {
	protected constructor(protected readonly component: { [K in keyof State]: State[K] }) {}

	public setState<K extends keyof State>(prop: K, value: State[K]): void {
		this.component[prop] = value;
	}
}

export class SkeletonController<State extends SkeletonState> extends BaseController<State> {
	public spanElement?: HTMLSpanElement;

	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
		this.setSpanRef = this.setSpanRef.bind(this);
	}

	public setSpanRef(element?: HTMLSpanElement): void {
		this.spanElement = element;
	}
}
