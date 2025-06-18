# KoliBri Angular Adapter (v20)

[![npm](https://img.shields.io/npm/v/@public-ui/angular-v20)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/angular-v20)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/angular-v20)](https://www.npmjs.com/package/@public-ui/angular-v20)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/angular-v20)](https://bundlephobia.com/result?p=@public-ui/angular-v20)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

This package provides an Angular adapter for KoliBri components, making them easily usable in Angular applications.

## Installation
```bash
npm install @public-ui/angular-v20
```

### With Standalone Components (Recommended)
```typescript
import { Component } from '@angular/core';
import { KolButton } from '@public-ui/angular-v20';

@Component({
        selector: 'app-root',
        standalone: true,
        imports: [KolButton],
        template: ` <kol-button _label="Click me!"></kol-button> `,
})
export class AppComponent {}
```

## Available Components
All KoliBri components are available as standalone components. Here's how to use them:
```typescript
import { KolButton, KolInputText, KolHeading } from '@public-ui/angular-v20';

@Component({
  imports: [KolButton, KolInputText, KolHeading],
})
```

## Migration from NgModule to Standalone
1. Remove the `KoliBriModule` import from your NgModule
2. Import the specific components you need directly
3. Add them to your component's `imports` array
4. Ensure your component is marked `standalone: true`

## Browser Support
This package supports all modern browsers that are supported by Angular 20.

## License
EUPL-1.2

## References
- [Architecture Concept](https://public-ui.github.io/docs/concepts/architecture)
- [Project Documentation](https://public-ui.github.io/docs)
