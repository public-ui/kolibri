#!/usr/bin/env node

const gradient = require('gradient-string');
const chalk = require('chalk');
const packageJson = require('../package.json');

const banner = gradient.atlas.multiline(
	`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${packageJson.version}
`,
	{
		interpolation: 'hsv',
	},
);
console.log(banner);
console.log(`🚀 ${chalk.bold(`Welcome to KoliBri`)}

To create a new project based on KoliBri, execute the following command for React, for example:

> ${chalk.blue(`npx degit public-ui/templates/csr/react-vite my-kolibri-project`)}

You must then change to the newly created directory and install the project:

> ${chalk.blue(`cd my-kolibri-project && npm install`)}

After the project has been installed, you can start it:

> ${chalk.blue(`npm start`)}

You can find numerous other example projects in our Git repository: ${chalk.blue(`https://github.com/public-ui/templates`)}`);
