const fs = require('fs');

const componentFileContents = fs.readFileSync('./src/components.ts', 'utf-8');
const componentList = [...componentFileContents.matchAll(/export class ([^ ]+)/g)].map((group) => group[1]);
const componentListStr = componentList.join(', ');

fs.writeFileSync(
        './src/index.ts',
        `
/* AutoGen NgModule */

export { ${componentListStr} } from './components';
export { ReplaceTagDirective } from './angular-component-lib/ReplaceTagDirective';
export { setTagNameTransformer } from './angular-component-lib/tagNameTransformer';
`,
        'utf-8',
);
