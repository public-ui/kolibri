import type { NamePropType } from './schema/props/name';
import { normalizeName, validateName } from './schema/props/name';

export abstract class BaseController<State> {
	protected constructor(protected readonly component: { [K in keyof State]: State[K] }) {}

	protected setState<K extends keyof State>(prop: K, value: State[K]): void {
		this.component[prop] = value;
	}
}

export interface SkeletonState {
	nameState?: NamePropType;
}

export class SkeletonController<State extends SkeletonState> extends BaseController<State> {
	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
	}
	public watchName(name?: NamePropType): void {
		const normalized = normalizeName(name);
		if (validateName(normalized)) {
			this.setState('nameState', normalized);
		}
	}
}
