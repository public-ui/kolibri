#! /usr/bin/env node

import fs from 'fs';
import { dump, load } from 'js-yaml';
import * as prettier from 'prettier';

const packageJsonPath = new URL('../package.json', import.meta.url);
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const filePath = new URL('../publiccode.yml', import.meta.url);
const doc = load(fs.readFileSync(filePath, 'utf8'));

doc.releaseDate = new Date().toISOString().split('T')[0];
doc.softwareVersion = packageJson.version;

const yamlString = dump(doc);

const prettierOptions = await prettier.resolveConfig(new URL('../prettier.config.js', import.meta.url));
const formattedYamlString = await prettier.format(yamlString, { ...prettierOptions, parser: 'yaml' });

fs.writeFileSync(filePath, formattedYamlString);
