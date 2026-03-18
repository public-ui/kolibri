// Common rules applied to all packages
import cssMustBeInLayer from './css-must-be-in-layer.js';
import layerNameConvention from './layer-name-convention.js';
import noAtRoot from './no-at-root.js';
import noLayerInReuseFiles from './no-layer-in-reuse-files.js';
import noRootSelector from './no-root-selector.js';
import requireComponentLayer from './require-component-layer.js';

export default [cssMustBeInLayer, layerNameConvention, noAtRoot, noLayerInReuseFiles, noRootSelector, requireComponentLayer];
