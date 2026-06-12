# KoliBri Angular Adapter (v22)

[![npm](https://img.shields.io/npm/v/@public-ui/angular-v22)](https://www.npmjs.com/package/@public-ui/angular-v22)
[![license](https://img.shields.io/npm/l/@public-ui/angular-v22)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/angular-v22)](https://www.npmjs.com/package/@public-ui/angular-v22)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/angular-v22)](https://bundlephobia.com/result?p=@public-ui/angular-v22)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

This package provides an Angular adapter for KoliBri components, making them easily usable in Angular applications.

## Installation

```bash
npm install @public-ui/angular-v22
pnpm add @public-ui/angular-v22
```

## Usage

### With Standalone Components (Recommended)

```typescript
import { Component } from '@angular/core';
import { KolButton } from '@public-ui/angular-v22';

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
import { KolButton, KolInputText, KolHeading } from '@public-ui/angular-v22';

@Component({
  // ...
  imports: [KolButton, KolInputText, KolHeading],
})
```

## Migration from NgModule to Standalone

If you're migrating from the NgModule approach to standalone components:

1. Remove the `KoliBriModule` import from your NgModule
2. Import the specific components you need directly
3. Add them to your component's `imports` array
4. Make sure your component is marked as `standalone: true`

Example migration:

```typescript
// Before (NgModule)
import { KoliBriModule } from '@public-ui/angular-v22';

@NgModule({
	imports: [KoliBriModule],
})
export class AppModule {}

// After (Standalone)
import { KolButton } from '@public-ui/angular-v22';

@Component({
	standalone: true,
	imports: [KolButton],
})
export class AppComponent {}
```

## Browser Support

This package supports all modern browsers that are supported by Angular 22.

Tokens can be customized with your own theme. See [default theme README](../../../themes/default/README.md).

## License

EUPL-1.2

## References

- [Architecture Concept](https://public-ui.github.io/docs/concepts/architecture)
- [Project Documentation](https://public-ui.github.io/docs)
