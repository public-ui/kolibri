import type { NamePropType } from '../../../../../schema';
import { normalizeName, validateName } from './schema/props/name';

class BaseController<S> {
	constructor(private component: unknown) {}

	protected setStateName(name: keyof S, value: unknown): void {
		this.component[name] = value;
	}
}

export class SkeletonController<S> extends BaseController<S> {
	public watchName(name?: NamePropType): void {
		name = normalizeName(name);
		if (validateName(name)) {
			this.component.nameState = name;
		}
	}
}
