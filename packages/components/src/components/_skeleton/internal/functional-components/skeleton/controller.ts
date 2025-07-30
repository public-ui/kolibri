import type { SkeletonState } from './component';

export type WatchCallback<T> = (value?: T) => void;

export type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: WatchCallback<Props[K]>;
};

export abstract class BaseController<State> {
	protected constructor(protected readonly component: { [K in keyof State]: State[K] }) {}

	public setState<K extends keyof State>(prop: K, value: State[K]): void {
		this.component[prop] = value;
	}
}

export class SkeletonController<State extends SkeletonState> extends BaseController<State> {
	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
	}
}
