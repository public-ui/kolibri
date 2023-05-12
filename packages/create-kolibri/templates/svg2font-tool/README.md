# Svg2Font - Convert SVG files to a font files

In [KoliBri (Public UI)](https://public-ui.github.io) we do without slots in order to be able to ensure the accessibility of the components. So we primary support only font icons. This tool helps to convert SVG files to font files.

## Project structure

This is a very tiny project. It has only two folders:

- `font` - This folder contains the font files, **after** the conversion.
- `svg` - This folder should contains your SVG files.

## Hints

- The SVG files must not be multicolored.
- The SVG files should be in the same size.

## Process

The following steps are necessary to convert the SVG files to font files.

### 1. Installation

You must install the dependencies with the following command:

```bash
pnpm i
```

### 2. Preparation

You should put your SVG files in the `svg` folder. The name of the SVG file will be the name of the icon. So you should use a meaningful name.

### 3. Configuration

You should configure the conversion in the `package.json` file. **⚠️ You should give your icon font a unique name, here for example `own`!**

```json
{
  "svgtofont": {
    "fontName": "{{kebab name}}-icons",
    "classNamePrefix": "{{kebab name}}",
    "css": {
      "fileName": "style"
    }
  }
}
```

> For more information about the configuration see the [svgtofont](https://wangchujiang.com/svgtofont/) documentation.

### 4. Build

The conversion delete the `font` folder and create a new one. So you should not put your font files in this folder.

You can convert your SVG files with the following command:

```bash
pnpm build
```

After the conversion you can find the font files in the `font` folder.

### 5. Usage

Die font files are ready to use. For example, you can copy the `font` folder as a static asset in your project and use them, like this:

Take a look at the `index.html` file:

```html
<html>
  <head>
    <title>Font icons</title>
    <link rel="stylesheet" href="font/style.css" />
  </head>
  <body>
    <i class="{{kebab name}}-kolibri"></i>
  </body>
</html>
```

### 6. Preview

You can preview the icons. Just open the `index.html` file in your browser.

You can serve `index.html` with the following command:

```bash
pnpm start
```

## Feedback

If you have any questions, problems or suggestions, please feel free to open an issue.

## License

This project is licensed under the EUPL License - see the [LICENSE](LICENSE) file for details.
