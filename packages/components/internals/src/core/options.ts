/**
 * The register options handed to `bootstrap` by the runtime packages. The framework-free
 * internals read them through this registry instead of importing the runtime bootstrap.
 */
export type KoliBriRegisterOptions = {
	reflectInputValues?: boolean;
};

let options: KoliBriRegisterOptions | undefined;

export const setRegisterOptions = (next: KoliBriRegisterOptions | undefined): void => {
	options = next;
};

export const getRegisterOptions = (): KoliBriRegisterOptions | undefined => options;
