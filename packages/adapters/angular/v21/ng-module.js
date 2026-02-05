const fs = require('fs');

const componentFileContents = fs.readFileSync('./src/components.ts', 'utf-8');
const componentList = [...componentFileContents.matchAll(/export class ([^ ]+)/g)].map((group) => group[1]);
const componentListStr = componentList.join(', ');

fs.writeFileSync(
	'./src/index.ts',
	`
/* AutoGen NgModule */

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ${componentListStr} } from './components';
import { ReplaceTagDirective } from './angular-component-lib/ReplaceTagDirective';
export { setTagNameTransformer } from './angular-component-lib/tagNameTransformer';

@NgModule({
  declarations: [ReplaceTagDirective, ${componentListStr}],
  exports: [${componentListStr}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class KoliBriModule {}
export { ${componentListStr} }
`,
	'utf-8',
);
