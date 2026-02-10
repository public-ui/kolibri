import layerNameConvention from './layer-name-convention.js';
import noLayerInUtilityFiles from './no-layer-in-utility-files.js';
import requireComponentLayer from './require-component-layer.js';
import requireGlobalLayer from './require-global-layer.js';

// Export individual plugins - they should be loaded directly in stylelint config
export default {
	'require-component-layer': requireComponentLayer, // Rule 1: src/components/ must use @layer kol-theme-component
	'require-global-layer': requireGlobalLayer, // Rule 2: global.scss must use @layer kol-theme-global
	'no-layer-in-utility-files': noLayerInUtilityFiles, // Rule 3: all other SCSS files must not use @layer
	'layer-name-convention': layerNameConvention, // Rule 4: warn about non-standard layer names
};
