const fs = require('fs');
const path = require('path');

let ngComponents = fs.readFileSync('./src/components.ts', 'utf-8');
// ngFile = ngFile.replace(/, NgModule/g, '');
// ngFile = ngFile.replace(/\/\* AutoGen NgModule(.*\n?)*/, '');

const componentList = ngComponents.split('export class');
componentList.splice(0, 1);
componentList.forEach((component, index) => {
	componentList[index] = component.replace(/ \{(.*\n?)*/, '').trim();
});

const componentListStr = componentList.join(', ');

fs.writeFileSync(
	'./src/index.ts',
	`
/* AutoGen NgModule */

import { NgModule } from '@angular/core';
import { ${componentListStr} } from './components';
export { ${componentListStr} }

@NgModule({
  declarations: [${componentListStr}],
  exports: [${componentListStr}],
})
export class KoliBriModule {}
`,
	'utf-8'
);
