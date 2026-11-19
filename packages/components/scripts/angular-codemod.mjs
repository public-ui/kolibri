/*
 * The official Angular output target generates proxies whose selector is the `kol-*` tag. Angular
 * fixes a selector at compile time, so a tag name transformer cannot rename the proxy host. This
 * script rewrites the generated proxies to render the KoliBri element under the transformed tag
 * inside the host (ReplaceTagDirective) and copies the runtime files from ./angular-component-lib.
 * The proxies stay standalone components, because applications import them one by one.
 */
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const libDir = join(scriptDir, 'angular-component-lib');
const adapters = ['../../adapters/angular/v20/src', '../../adapters/angular/v21/src'];

const ANGULAR_CORE_IMPORT = "import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';\n";
const COMPONENT_PATTERN =
	/@Component\(\{\n {2}selector: '(kol-[a-z-]+)',\n {2}changeDetection: ChangeDetectionStrategy\.OnPush,\n {2}template: '<ng-content><\/ng-content>',\n {2}\/\/ eslint-disable-next-line @angular-eslint\/no-inputs-metadata-property\n {2}inputs: \[(.*)\],\n {2}standalone: false\n\}\)\nexport class (\w+) \{\n {2}protected el: (\w+);\n {2}constructor\(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone\) \{\n {4}c\.detach\(\);\n {4}this\.el = r\.nativeElement;\n {2}\}\n\}/g;

const inputNames = (inputs) => [...inputs.matchAll(/(?:^|, )(?:'(_\w+)'|\{ name: '(_\w+)'[^}]*\})/g)].map((match) => match[1] ?? match[2]);

const rewriteComponent = (_match, tagName, inputs, className, elementType) => {
	const names = inputNames(inputs);
	const bindings = names.map((name) => `[${name}]="${name}"`).join(' ');
	return `@Component({
  selector: '${tagName}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <ng-container *ngIf="hasTagNameTransformer; else defaultCase">
      <stencil-ng-proxy ${bindings} *replaceTag="tagName">
        <ng-container *ngTemplateOutlet="ngContentOutlet"></ng-container>
      </stencil-ng-proxy>
    </ng-container>
    <ng-template #defaultCase>
      <ng-container *ngTemplateOutlet="ngContentOutlet"></ng-container>
    </ng-template>
    <ng-template #ngContentOutlet>
      <ng-content></ng-content>
    </ng-template>\`,
  imports: [NgIf, NgTemplateOutlet, ReplaceTagDirective],
  inputs: [${inputs}],
  providers: [{ provide: StencilProxyComponent, useExisting: forwardRef(() => ${className}) }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ${className} extends StencilProxyComponent implements OnChanges, OnInit {
  protected el: ${elementType};
  public readonly availableInputProperties = [${names.map((name) => `'${name}'`).join(', ')}];
  public readonly tagName = transformTag('${tagName}');
  public readonly hasTagNameTransformer = this.tagName !== '${tagName}';
  constructor(private readonly c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.el = r.nativeElement;
  }
  ngOnChanges(): void {
    this.c.detectChanges();
  }
  ngOnInit(): void {
    this.c.detectChanges();
  }
}`;
};

for (const adapter of adapters.map((path) => join(scriptDir, path))) {
	const file = join(adapter, 'components.ts');
	const source = readFileSync(file, 'utf8');
	const componentCount = (source.match(/@Component\(/g) ?? []).length;
	let rewrittenCount = 0;
	let rewritten = source.replace(COMPONENT_PATTERN, (...args) => {
		rewrittenCount++;
		return rewriteComponent(...args);
	});
	if (!rewritten.includes(ANGULAR_CORE_IMPORT) || rewrittenCount !== componentCount) {
		throw new Error(`angular-codemod: ${rewrittenCount} of ${componentCount} generated proxies in ${file} match the expected shape`);
	}
	rewritten = rewritten.replace(
		ANGULAR_CORE_IMPORT,
		[
			"import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, forwardRef, NgZone, OnChanges, OnInit } from '@angular/core';",
			"import { NgIf, NgTemplateOutlet } from '@angular/common';",
			"import { transformTag } from '@public-ui/components';",
			"import { ReplaceTagDirective } from './angular-component-lib/ReplaceTagDirective';",
			"import { StencilProxyComponent } from './angular-component-lib/StencilProxyComponent';",
			'',
		].join('\n'),
	);
	writeFileSync(file, rewritten);
	for (const lib of readdirSync(libDir)) {
		copyFileSync(join(libDir, lib), join(adapter, 'angular-component-lib', lib));
	}
	console.log(`angular-codemod: ${rewrittenCount} proxies rehost their tag in ${file}`);
}
