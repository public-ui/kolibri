#! /usr/bin/env node

import yaml from 'js-yaml';
import fs from 'fs';
import * as prettier from 'prettier';
import packageJson from '../packages/components/package.json' assert { type: 'json' };

const filePath = new URL('../publiccode.yml', import.meta.url);
const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));

doc.releaseDate = new Date().toISOString().split('T')[0];
doc.softwareVersion = packageJson.version;

const yamlString = yaml.dump(doc);

const prettierOptions = await prettier.resolveConfig(new URL('../prettier.config.js', import.meta.url));
const formattedYamlString = await prettier.format(yamlString, { ...prettierOptions, parser: 'yaml' });

fs.writeFileSync(filePath, formattedYamlString);
