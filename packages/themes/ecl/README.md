# KoliBri - ECL-Themes (Draft)

[![npm](https://img.shields.io/npm/v/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/theme-ecl)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/theme-ecl)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-ecl)](https://bundlephobia.com/result?p=@public-ui/theme-ecl)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

The ECL themes provide styling according to the Styleguides of the European Commission and European Union for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i @public-ui/theme-ecl
pnpm i @public-ui/theme-ecl
yarn add @public-ui/theme-ecl
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import {
	ECL_EC, // or ECL_EU
} from '@public-ui/theme-ecl';

register(
	ECL_EC, // or ECL_EU
	defineCustomElements,
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```

## Design Tokens

The token values are read from `src/ecl-ec/global.scss` and `src/ecl-eu/global.scss` and control the colors, fonts and spacing of the components.

### ECL EC Theme

| Token                   | Default value         | Meaning                 |
| ----------------------- | --------------------- | ----------------------- |
| `--color-blue`          | `#004494`             | Primary blue tone       |
| `--color-yellow`        | `#ffd617`             | Primary yellow tone     |
| `--color-grey`          | `#404040`             | Base gray               |
| `--color-blue-130`      | `#002f67`             | Darker blue shade       |
| `--color-blue-120`      | `#003776`             | Darker blue shade       |
| `--color-blue-110`      | `#003d84`             | Darker blue shade       |
| `--color-blue-100`      | `var(--color-blue)`   | Base blue               |
| `--color-blue-75`       | `#4073af`             | Lighter blue shade      |
| `--color-blue-50`       | `#bfd0e4`             | Very light blue shade   |
| `--color-blue-25`       | `#bfd0e4`             | Very light blue shade   |
| `--color-blue-5`        | `#f2f5f9`             | Almost white            |
| `--color-yellow-120`    | `#f8ae21`             | Darker yellow shade     |
| `--color-yellow-110`    | `#fbc11d`             | Darker yellow shade     |
| `--color-yellow-100`    | `var(--color-yellow)` | Base yellow             |
| `--color-yellow-75`     | `#ffde39`             | Lighter yellow shade    |
| `--color-yellow-50`     | `#ffe879`             | Lighter yellow shade    |
| `--color-yellow-25`     | `#fff4bb`             | Very light yellow shade |
| `--color-grey-100`      | `var(--color-grey)`   | Base gray               |
| `--color-grey-75`       | `#707070`             | Medium gray             |
| `--color-grey-50`       | `#9f9f9f`             | Light gray              |
| `--color-grey-25`       | `#cfcfcf`             | Light gray              |
| `--color-grey-20`       | `#d9d9d9`             | Very light gray         |
| `--color-grey-15`       | `#e3e3e3`             | Very light gray         |
| `--color-grey-10`       | `#ebebeb`             | Very light gray         |
| `--color-grey-5`        | `#f5f5f5`             | Almost white            |
| `--color-grey-3`        | `#f9f9f9`             | Almost white            |
| `--color-blue-n`        | `#006fb4`             | Additional blue tone    |
| `--color-orange`        | `#f29527`             | Orange for notices      |
| `--color-green`         | `#467a39`             | Green for success       |
| `--color-red`           | `#da2131`             | Red for errors          |
| `--color-red-1xx`       | `#981722`             | Dark red tone           |
| `--color-black`         | `#000`                | Black                   |
| `--color-white`         | `#fff`                | White                   |
| `--font-family`         | `Arial, sans-serif`   | Default font            |
| `--font-size`           | `#{rem(16)}`          | Base font size          |
| `--font-weight`         | `400`                 | Regular font weight     |
| `--font-weight-bold`    | `600`                 | Bold font               |
| `--line-height`         | `1.5`                 | Line height text        |
| `--line-height-heading` | `1.2`                 | Line height headings    |
| `--spacing-4xl`         | `#{rem(64)}`          | Largest spacing         |
| `--spacing-3xl`         | `#{rem(48)}`          | Very large spacing      |
| `--spacing-2xl`         | `#{rem(40)}`          | Very large spacing      |
| `--spacing-xl`          | `#{rem(32)}`          | Large spacing           |
| `--spacing-l`           | `#{rem(24)}`          | Large spacing           |
| `--spacing-m`           | `#{rem(16)}`          | Standard spacing        |
| `--spacing-s`           | `#{rem(12)}`          | Small spacing           |
| `--spacing-xs`          | `#{rem(8)}`           | Very small spacing      |
| `--spacing-2xs`         | `#{rem(4)}`           | Tiny spacing            |

### ECL EU Theme

| Token                     | Default value       | Meaning                 |
| ------------------------- | ------------------- | ----------------------- |
| `--color-blue`            | `#0e47cb`           | Primary blue tone       |
| `--color-blue-140`        | `#082b7a`           | Very dark blue shade    |
| `--color-blue-130`        | `#082b7a`           | Very dark blue shade    |
| `--color-blue-120`        | `#0b39a2`           | Darker blue shade       |
| `--color-blue-110`        | `#0d40b7`           | Darker blue shade       |
| `--color-blue-100`        | `#0e47cb`           | Base blue               |
| `--color-blue-80`         | `#3e6cd5`           | Lighter blue shade      |
| `--color-blue-60`         | `#6e91e0`           | Lighter blue shade      |
| `--color-blue-40`         | `#9fb5ea`           | Very light blue shade   |
| `--color-blue-20`         | `#cfdaf5`           | Very light blue shade   |
| `--color-blue-10`         | `#e7edfa`           | Very light blue shade   |
| `--color-blue-5`          | `#f3f6fc`           | Almost white            |
| `--color-yellow`          | `#ffcc00`           | Primary yellow tone     |
| `--color-yellow-140`      | `#997a00`           | Very dark yellow shade  |
| `--color-yellow-130`      | `#b38f00`           | Very dark yellow shade  |
| `--color-yellow-120`      | `#cca300`           | Darker yellow shade     |
| `--color-yellow-110`      | `#e6b800`           | Darker yellow shade     |
| `--color-yellow-100`      | `#ffcc00`           | Base yellow             |
| `--color-yellow-80`       | `#ffd633`           | Lighter yellow shade    |
| `--color-yellow-60`       | `#ffe066`           | Lighter yellow shade    |
| `--color-yellow-40`       | `#ffeb99`           | Very light yellow shade |
| `--color-yellow-20`       | `#fff5cc`           | Very light yellow shade |
| `--color-yellow-10`       | `#fffae6`           | Very light yellow shade |
| `--color-yellow-5`        | `#fffcf2`           | Almost white            |
| `--color-grey`            | `#262b38`           | Dark gray               |
| `--color-grey-140`        | `#171a22`           | Very dark gray          |
| `--color-grey-130`        | `#1b1e27`           | Very dark gray          |
| `--color-grey-120`        | `#1e222d`           | Darker gray             |
| `--color-grey-110`        | `#222732`           | Darker gray             |
| `--color-grey-100`        | `#262b38`           | Base gray               |
| `--color-grey-80`         | `#515560`           | Medium gray             |
| `--color-grey-75`         | `#515560`           | Medium gray             |
| `--color-grey-60`         | `#7d8088`           | Light gray              |
| `--color-grey-40`         | `#a8aaaf`           | Light gray              |
| `--color-grey-20`         | `#d4d5d7`           | Very light gray         |
| `--color-grey-10`         | `#e9eaeb`           | Very light gray         |
| `--color-grey-5`          | `#f4f5f5`           | Almost white            |
| `--color-grey-3`          | `#f9f9f9`           | Almost white            |
| `--color-orange`          | `#ff6200`           | Orange tone             |
| `--color-orange-140`      | `#993b00`           | Very dark orange        |
| `--color-orange-130`      | `#b34500`           | Very dark orange        |
| `--color-orange-120`      | `#cc4e00`           | Darker orange           |
| `--color-orange-110`      | `#e65800`           | Darker orange           |
| `--color-orange-100`      | `#e65800`           | Base orange             |
| `--color-orange-80`       | `#ff8133`           | Light orange            |
| `--color-orange-60`       | `#ff914d`           | Light orange            |
| `--color-orange-40`       | `#ffb180`           | Very light orange       |
| `--color-orange-20`       | `#ffd0b3`           | Very light orange       |
| `--color-orange-10`       | `#ffefe6`           | Very light orange       |
| `--color-orange-5`        | `#fff7f2`           | Almost white            |
| `--color-green`           | `#00c991`           | Green for success       |
| `--color-green-140`       | `#007957`           | Very dark green         |
| `--color-green-130`       | `#008d66`           | Very dark green         |
| `--color-green-120`       | `#008d66`           | Darker green            |
| `--color-green-110`       | `#00b583`           | Darker green            |
| `--color-green-100`       | `#00c991`           | Base green              |
| `--color-green-80`        | `#00c991`           | Light green             |
| `--color-green-60`        | `#66dfbd`           | Light green             |
| `--color-green-40`        | `#99e9d3`           | Very light green        |
| `--color-green-20`        | `#ccf4e9`           | Very light green        |
| `--color-green-10`        | `#e6faf4`           | Very light green        |
| `--color-green-5`         | `#f2fcf9`           | Almost white            |
| `--color-red`             | `#ef0044`           | Red for errors          |
| `--color-red-140`         | `#8f0029`           | Very dark red           |
| `--color-red-130`         | `#a70030`           | Very dark red           |
| `--color-red-120`         | `#bf0036`           | Darker red              |
| `--color-red-110`         | `#d7003d`           | Darker red              |
| `--color-red-100`         | `#ef0044`           | Base red                |
| `--color-red-80`          | `#f23369`           | Helles Rot              |
| `--color-red-60`          | `#f5668f`           | Helles Rot              |
| `--color-red-40`          | `#f999b4`           | Very light red          |
| `--color-red-20`          | `#fcccda`           | Very light red          |
| `--color-red-10`          | `#fde6ec`           | Very light red          |
| `--color-red-5`           | `#fef2f5`           | Almost white            |
| `--color-accent-blue-100` | `#00e9ff`           | Blue accent color       |
| `--color-accent-blue-30`  | `#b3f8ff`           | Very light accent color |
| `--color-purple`          | `#510dcd`           | Purple accent           |
| `--color-purple-140`      | `#31087b`           | Very dark purple        |
| `--color-purple-130`      | `#390990`           | Very dark purple        |
| `--color-purple-120`      | `#410aa4`           | Darker purple           |
| `--color-purple-110`      | `#490cb9`           | Darker purple           |
| `--color-purple-100`      | `#510dcd`           | Base purple             |
| `--color-purple-80`       | `#743dd7`           | Lighter purple          |
| `--color-purple-60`       | `#976ee1`           | Lighter purple          |
| `--color-purple-40`       | `#bf9af1`           | Very light purple       |
| `--color-purple-20`       | `#dccff5`           | Very light purple       |
| `--color-purple-10`       | `#eee7fa`           | Very light purple       |
| `--color-purple-5`        | `#eee7fa`           | Very light purple       |
| `--color-white`           | `#fff`              | White                   |
| `--color-black`           | `#000`              | Black                   |
| `--font-family`           | `Arial, sans-serif` | Default font            |
| `--font-size`             | `#{rem(16)}`        | Base font size          |
| `--font-weight-regular`   | `400`               | Regular font weight     |
| `--font-weight-bold`      | `700`               | Bold font               |
| `--line-height-regular`   | `1.5`               | Line height text        |
| `--line-height-heading`   | `1.2`               | Line height headings    |
| `--spacing-4xl`           | `#{rem(64)}`        | Largest spacing         |
| `--spacing-3xl`           | `#{rem(48)}`        | Very large spacing      |
| `--spacing-2xl`           | `#{rem(40)}`        | Very large spacing      |
| `--spacing-xl`            | `#{rem(32)}`        | Large spacing           |
| `--spacing-l`             | `#{rem(24)}`        | Large spacing           |
| `--spacing-m`             | `#{rem(16)}`        | Standard spacing        |
| `--spacing-s`             | `#{rem(12)}`        | Small spacing           |
| `--spacing-xs`            | `#{rem(8)}`         | Very small spacing      |
| `--spacing-2xs`           | `#{rem(4)}`         | Tiny spacing            |
