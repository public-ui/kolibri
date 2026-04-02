import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Download prop
 *
 * Tells the browser that the link contains a file to download.
 * Optionally sets the filename.
 */
export type DownloadProp = SimpleProp<'download', string>;

export const downloadProp = createPropDefinition<DownloadProp>('download', '', normalizeString);
