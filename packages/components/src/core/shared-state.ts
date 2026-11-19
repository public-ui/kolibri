/**
 * The runtime is bundled per output target: the root entry, the lazy loader and the custom elements
 * build each carry their own copy of every module. State that an application sets through one copy
 * (e.g. `bootstrap` from the root entry) and components read in another lives in this global slot,
 * so all copies share one instance per key.
 */
export const getSharedState = <T extends object>(key: string, create: () => T): T => {
	const globals = ((globalThis as { KoliBriGlobals?: Record<string, object> }).KoliBriGlobals ??= {});
	globals[key] ??= create();
	return globals[key] as T;
};
