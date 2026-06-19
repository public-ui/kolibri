const fs = require('fs');

let componentFileContents = fs.readFileSync('./src/components.ts', 'utf-8');

// Angular v22 strictly checks templates even during library builds, rejecting unknown
// custom elements (<stencil-ng-proxy>) and unimported directives. Make each generated
// component standalone so it can declare its own imports and schemas.
componentFileContents = componentFileContents.replace(
	/\n  providers: \[/g,
	['\n  standalone: true,', '\n  imports: [CommonModule, ReplaceTagDirective],', '\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],', '\n  providers: ['].join(''),
);

fs.writeFileSync('./src/components.ts', componentFileContents, 'utf-8');

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
