import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type DownloadProp = SimpleProp<'download', string>;
// The default is `undefined` (not `''` like other string props) to keep "not set" distinguishable
// from "explicitly empty": `download` is a presence attribute, so `_download=""` must render as
// `download=""` (download without a suggested filename) while an unset `_download` must not
// render the attribute at all.
export const downloadProp = createPropDefinition<DownloadProp>('download', undefined as unknown as string, normalizeString);
