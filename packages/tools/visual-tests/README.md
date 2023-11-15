{
	"name": "{{kebab name}}",
	"version": "0.0.0",
	"description": "{{description}}",
	"author": {
		"name": "{{author}}",
		"email": "{{email}}"
	},
	"license": "EUPL-1.2",
	"private": false,
	"scripts": {
		"build": "unbuild",
		"depcheck": "depcheck",
		"format": "prettier --check src",
		"lint": "eslint src",
		"prepack": "unbuild",
		"test": "THEME_MODULE=src/index THEME_EXPORT={{capital name}} kolibri-visual-test",
		"test-update": "THEME_MODULE=src/index THEME_EXPORT={{capital name}} kolibri-visual-test --update-snapshots theme-snapshots.spec.js",
		"unused": "knip"
	},
	"devDependencies": {
		"@public-ui/components": "2.0.0-rc.7",
		"@public-ui/schema": "2.0.0-rc.7",
		"@public-ui/visual-tests": "2.0.0-rc.7",
		"@typescript-eslint/eslint-plugin": "6.8.0",
		"@typescript-eslint/parser": "6.8.0",
		"depcheck": "1.4.7",
		"eslint": "8.51.0",
		"eslint-config-prettier": "9.0.0",
		"eslint-plugin-html": "7.1.0",
		"eslint-plugin-jsdoc": "46.8.2",
		"eslint-plugin-json": "3.1.0",
		"eslint-plugin-no-loops": "0.3.0",
		"knip": "2.35.0",
		"npm-check-updates": "16.14.6",
		"prettier": "3.0.3",
		"unbuild": "1.2.1"
	},
	"peerDependencies": {
		"@public-ui/components": "2.0.0-rc.7"
	},
	"sideEffects": false,
	"type": "module",
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"import": "./dist/index.mjs",
			"require": "./dist/index.cjs"
		}
	},
	"main": "./dist/index.cjs",
	"module": "./dist/index.mjs",
	"types": "./dist/index.d.ts",
	"files": [
		"assets",
		"dist"
	]
}
