const fs = require('fs');
let packageJson = fs.readFileSync('./package.json', { encoding: 'utf8' });
const prettier = require('prettier');

packageJson = JSON.parse(packageJson);

// packageJson.dependencies['@public-ui/angular'] = 'file:kolibri-angular.tgz';
packageJson.dependencies['@public-ui/core'] = 'file:kolibri-core.tgz';
packageJson.dependencies['@public-ui/components'] = 'file:kolibri-lib.tgz';
packageJson.dependencies['@public-ui/react'] = 'file:kolibri-react.tgz';
packageJson.dependencies['@public-ui/schema'] = 'file:kolibri-schema.tgz';
// packageJson.dependencies['@public-ui/solid'] = 'file:kolibri-solid.tgz';
packageJson.dependencies['@public-ui/themes'] = 'file:kolibri-themes.tgz';

packageJson = prettier.format(JSON.stringify(packageJson), {
	parser: 'json',
	printWidth: 120,
	singleQuote: true,
});

console.log(packageJson);

fs.writeFileSync('./package.json', packageJson, {
	encoding: 'utf8',
});
