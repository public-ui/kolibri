import type { NamePropType } from './schema/props/name';
import { normalizeName, validateName } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';
import { normalizeShow, validateShow } from './schema/props/show';
import type { SkeletonState } from './state';

export type WatchCallback<T> = (value?: T) => void;

export type ControllerWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: WatchCallback<Props[K]>;
};

export abstract class BaseController<State> {
	protected constructor(protected readonly component: { [K in keyof State]: State[K] }) {}

	protected setState<K extends keyof State>(prop: K, value: State[K]): void {
		this.component[prop] = value;
	}
}

export type SkeletonControllerWatchers = ControllerWatchers<{
	name: NamePropType;
	show: ShowPropType;
}>;

export class SkeletonController<State extends SkeletonState> extends BaseController<State> implements SkeletonControllerWatchers {
	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
	}

	public watchName: WatchCallback<NamePropType> = (value?: NamePropType): void => {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.setState('nameState', normalized);
		}
	};

	public watchShow: WatchCallback<ShowPropType> = (value?: ShowPropType): void => {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.setState('showState', normalized);
		}
	};
}
