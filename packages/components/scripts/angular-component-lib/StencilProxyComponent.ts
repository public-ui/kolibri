/**
 * Injection token of the proxies: `ReplaceTagDirective` reads the input names of the proxy it renders in.
 */
export abstract class StencilProxyComponent {
	public abstract availableInputProperties: string[];
}
