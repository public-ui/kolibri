# slidev-theme-unicorn

[![NPM version](https://img.shields.io/npm/v/slidev-theme-unicorn?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-unicorn)

A Unicorn theme for [Slidev](https://github.com/slidevjs/slidev).

This theme is based on [dawntraoz.com](https://www.dawntraoz.com/) website design.

Live demo: https://unicorn-theme.dawntraoz.com/

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>unicorn</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/themes/use).

## Layouts

This theme provides the following layouts:

### Common properties

By default any layout will contain a header and a footer expecting:

```
---
logoHeader: 'https://www.dawntraoz.com/images/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
---
```

If you don't add this property it will be an empty slide expecting your content:

With properties            | Without properties 
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-center.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-center-without-header-footer.png)

---

### Intro `intro`

Usage:

- Add `intro` in the layout field.
- Add your profile image in the `introImage` field.

```
---
layout: intro
introImage: 'https://img2.storyblok.com/312x312/filters:format(webp)/f/79165/400x400/1082ff0d24/dawntraoz-alba-silvente.jpg'
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-intro.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-intro.png)

---

### Default `cover`

Cover is the default layout when none is specified.

Usage:

```
---
layout: cover
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-cover.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-cover.png)

---

### Presentation `cover-logos`

Usage:

- Add `cover-logos` in the layout field.
- Add an Array of logo URLs in the `logos` field.

```
---
layout: cover-logos
logos: [
  'https://img2.storyblok.com/588x0/filters::format(webp)/f/86387/x/21aa32ed18/logo-normal.svg',
  'https://nuxtjs.org/logos/nuxt-emoji.png',
]
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-cover-logos.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-cover-logos.png)

---

### Table of contents `table-contents`

Usage:

- Add `table-contents` in the layout field.
- Add an Array of hexadecimal colours in the `gradientColors` field to fill the illustration.

```
---
layout: table-contents
gradientColors: ['#8EC5FC', '#E0C3FC']
---
```

Dark (added gradient)      | Light (default gradient)
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-table-content.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-table-content.png)

---

### New section slide `new-section`

> Always in dark version

Usage:

- Add `new-section` in the layout field.

```
---
layout: new-section
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/new-section.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/new-section.png)

---

### Image Centered `image-center`

The content will be place before the image, you can add a title, subtitle to give context to the image.

```
---
layout: image-center
image: 'https://source.unsplash.com/collection/94734566/1920x1080'
imageWidth: '450'
imageHeight: '950'
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-image-centered.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-image-center.png)

---

### Text centered `center`

```
---
layout: center
---
```

Dark                       | Light
:-------------------------:|:-------------------------:
![introDark](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/dark-theme-center.png) | ![introLight](https://raw.githubusercontent.com/Dawntraoz/slidev-theme-unicorn/master/screenshots/light-theme-center.png)

---

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG
