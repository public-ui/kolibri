import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type DownloadProp = SimpleProp<'download', string>;
export const downloadProp = createPropDefinition<DownloadProp>('download', '', normalizeString);
