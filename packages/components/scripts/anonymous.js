const fs = require('fs');
let packageJson = fs.readFileSync('./package.json', { encoding: 'utf8' });
const prettier = require('prettier');

packageJson = JSON.parse(packageJson);

delete packageJson.dependencies;
delete packageJson.devDependencies;
delete packageJson.scripts;
delete packageJson.husky;
delete packageJson['lint-staged'];
delete packageJson.collection;
delete packageJson['collection:main'];
// delete packageJson.repository;
// delete packageJson.publishConfig;
delete packageJson.unpkg;
// packageJson.files.push('docs/.vitepress/dist/');
// packageJson.files.push('docs/components/');
// packageJson.files.push('www/');
packageJson.scripts = {
	postpack: 'mv package.bak.json package.json',
};

prettier
	.format(JSON.stringify(packageJson), {
		parser: 'json',
		printWidth: 120,
		singleQuote: true,
	})
	.then((packageJson) => {
		console.log(packageJson);

		fs.writeFileSync('./package.json', packageJson, {
			encoding: 'utf8',
		});
	})
	.catch(console.error);
