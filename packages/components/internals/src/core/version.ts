/**
 * The KoliBri version used for logging and diagnostics. The runtime packages inject their real
 * package version at boot (the Stencil bootstrap reads it from its build environment); without
 * an injection the registry falls back to this placeholder instead of guessing a version.
 */
let kolibriVersion = '0.0.0';

export const setKolibriVersion = (version: string): void => {
	kolibriVersion = version;
};

export const getKolibriVersion = (): string => kolibriVersion;
