export const REMOVE_MODE = ['delete', 'prefix'] as const;
export type RemoveMode = (typeof REMOVE_MODE)[number];
