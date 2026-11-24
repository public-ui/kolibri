import { getSharedState } from './shared-state';

/**
 * The register options handed to `bootstrap` by the runtime packages. The framework-free
 * internals read them through this registry instead of importing the runtime bootstrap.
 */
export type KoliBriRegisterOptions = {
	reflectInputValues?: boolean;
};

/*
 * The runtime is bundled per output target: the bootstrap call runs in another copy of this module
 * than the framework-free behaviors read from. The shared state carries the options across the
 * copies, like every other cross-copy state.
 */
const shared = getSharedState('register-options', (): { options?: KoliBriRegisterOptions } => ({}));

export const setRegisterOptions = (next: KoliBriRegisterOptions | undefined): void => {
	shared.options = next;
};

export const getRegisterOptions = (): KoliBriRegisterOptions | undefined => shared.options;
