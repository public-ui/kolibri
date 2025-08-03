import type { RequiredRenderProps } from './generic-types';

export abstract class BaseController<Props> {
	public constructor(private readonly props: RequiredRenderProps<Props>) {}

	protected setProp<K extends keyof Props>(key: K, value: RequiredRenderProps<Props>[K]): void {
		this.props[key] = value;
	}

	public getProps(): RequiredRenderProps<Props> {
		return this.props;
	}
}
